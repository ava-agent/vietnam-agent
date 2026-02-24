export interface ExchangeRate {
  from: 'CNY';
  to: 'VND';
  rate: number;
  lastUpdated: string;
}

export interface PriceReference {
  id: string;
  name: string;
  vndPrice: number;
  cnyEquivalent: number;
  icon: string;
  category: string;
}

export interface ExchangeTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface QuickAmount {
  cny: number;
  label: string;
}
