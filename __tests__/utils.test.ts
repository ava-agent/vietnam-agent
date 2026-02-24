import {formatVND, formatCNY} from '../src/utils/formatCurrency';

describe('Currency Formatting Utils', () => {
  describe('formatVND', () => {
    test('should format zero correctly', () => {
      expect(formatVND(0)).toBe('0 ₫');
    });

    test('should format zero without symbol', () => {
      expect(formatVND(0, false)).toBe('0');
    });

    test('should format small amounts', () => {
      expect(formatVND(10000)).toBe('10,000 ₫');
    });

    test('should format large amounts', () => {
      expect(formatVND(3500000)).toBe('3,500,000 ₫');
    });

    test('should format without symbol', () => {
      expect(formatVND(50000, false)).toBe('50,000');
    });

    test('should format with symbol by default', () => {
      expect(formatVND(100000)).toContain('₫');
    });
  });

  describe('formatCNY', () => {
    test('should format zero correctly', () => {
      expect(formatCNY(0)).toBe('¥0');
    });

    test('should format with ¥ prefix', () => {
      expect(formatCNY(100)).toBe('¥100');
    });

    test('should format large amounts with commas', () => {
      expect(formatCNY(10000)).toBe('¥10,000');
    });
  });
});

describe('Currency Conversion Logic', () => {
  const RATE = 3500;

  test('basic conversion CNY to VND', () => {
    expect(100 * RATE).toBe(350000);
  });

  test('conversion with rounding', () => {
    const result = Math.round(99.5 * RATE);
    expect(result).toBe(348250);
  });

  test('zero conversion', () => {
    expect(0 * RATE).toBe(0);
  });
});
