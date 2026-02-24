import {checklistData} from '../src/data/checklist';
import {
  exchangeRate,
  quickAmounts,
  priceReferences,
  exchangeTips,
} from '../src/data/currency';
import {recommendedApps} from '../src/data/apps';
import {citiesData} from '../src/data/attractions';

describe('Data Integrity Tests', () => {
  describe('Checklist Data', () => {
    test('should have at least 5 categories', () => {
      expect(checklistData.length).toBeGreaterThanOrEqual(5);
    });

    test('all category IDs should be unique', () => {
      const ids = checklistData.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('all item IDs should be unique across all categories', () => {
      const allIds = checklistData.flatMap(c => c.items.map(i => i.id));
      expect(new Set(allIds).size).toBe(allIds.length);
    });

    test('each category should have at least 3 items', () => {
      checklistData.forEach(category => {
        expect(category.items.length).toBeGreaterThanOrEqual(3);
      });
    });

    test('each item should have name and description', () => {
      checklistData.forEach(category => {
        category.items.forEach(item => {
          expect(item.name).toBeTruthy();
          expect(item.description).toBeTruthy();
          expect(typeof item.essential).toBe('boolean');
        });
      });
    });
  });

  describe('Currency Data', () => {
    test('exchange rate should be positive', () => {
      expect(exchangeRate.rate).toBeGreaterThan(0);
    });

    test('quick amounts should be sorted ascending', () => {
      for (let i = 1; i < quickAmounts.length; i++) {
        expect(quickAmounts[i].cny).toBeGreaterThan(quickAmounts[i - 1].cny);
      }
    });

    test('price references should have valid values', () => {
      priceReferences.forEach(ref => {
        expect(ref.vndPrice).toBeGreaterThan(0);
        expect(ref.cnyEquivalent).toBeGreaterThan(0);
        expect(ref.name).toBeTruthy();
        expect(ref.icon).toBeTruthy();
      });
    });

    test('all price reference IDs should be unique', () => {
      const ids = priceReferences.map(r => r.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('exchange tips should have content', () => {
      exchangeTips.forEach(tip => {
        expect(tip.title).toBeTruthy();
        expect(tip.content.length).toBeGreaterThan(10);
      });
    });
  });

  describe('Apps Data', () => {
    test('should have at least 10 apps', () => {
      expect(recommendedApps.length).toBeGreaterThanOrEqual(10);
    });

    test('all app IDs should be unique', () => {
      const ids = recommendedApps.map(a => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('each app should have required fields', () => {
      recommendedApps.forEach(app => {
        expect(app.name).toBeTruthy();
        expect(app.chineseName).toBeTruthy();
        expect(app.description).toBeTruthy();
        expect(app.iosUrl).toMatch(/^https:\/\//);
        expect(app.androidUrl).toMatch(/^https:\/\//);
        expect(app.category).toBeTruthy();
      });
    });

    test('should have at least 2 essential apps', () => {
      const essentialApps = recommendedApps.filter(a => a.essential);
      expect(essentialApps.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Attractions Data', () => {
    test('should have at least 4 cities', () => {
      expect(citiesData.length).toBeGreaterThanOrEqual(4);
    });

    test('all city IDs should be unique', () => {
      const ids = citiesData.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('each city should have attractions, food, transport, and budget', () => {
      citiesData.forEach(city => {
        expect(city.attractions.length).toBeGreaterThan(0);
        expect(city.food.length).toBeGreaterThan(0);
        expect(city.transport.length).toBeGreaterThan(0);
        expect(city.budget.length).toBeGreaterThan(0);
      });
    });

    test('all attraction IDs should be unique within a city', () => {
      citiesData.forEach(city => {
        const ids = city.attractions.map(a => a.id);
        expect(new Set(ids).size).toBe(ids.length);
      });
    });

    test('attraction ratings should be between 1 and 5', () => {
      citiesData.forEach(city => {
        city.attractions.forEach(attraction => {
          expect(attraction.rating).toBeGreaterThanOrEqual(1);
          expect(attraction.rating).toBeLessThanOrEqual(5);
        });
      });
    });

    test('each city should have name and description', () => {
      citiesData.forEach(city => {
        expect(city.name).toBeTruthy();
        expect(city.englishName).toBeTruthy();
        expect(city.description.length).toBeGreaterThan(20);
        expect(city.highlights.length).toBeGreaterThan(0);
      });
    });
  });
});
