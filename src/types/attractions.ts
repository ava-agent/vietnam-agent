export interface Attraction {
  id: string;
  name: string;
  englishName: string;
  description: string;
  address: string;
  openingHours: string;
  ticketPrice: string;
  tips: string[];
  rating: number;
  duration: string;
}

export interface FoodRecommendation {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  cnyEquivalent: string;
  tips: string[];
}

export interface TransportTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface BudgetEstimate {
  category: string;
  lowBudget: string;
  midBudget: string;
  highBudget: string;
}

export interface City {
  id: string;
  name: string;
  englishName: string;
  description: string;
  highlights: string[];
  attractions: Attraction[];
  food: FoodRecommendation[];
  transport: TransportTip[];
  budget: BudgetEstimate[];
}
