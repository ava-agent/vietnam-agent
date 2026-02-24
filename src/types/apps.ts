export type AppCategoryType =
  | 'transportation'
  | 'food'
  | 'communication'
  | 'payment'
  | 'navigation'
  | 'accommodation'
  | 'utility';

export interface RecommendedApp {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  category: AppCategoryType;
  categoryLabel: string;
  icon: string;
  iosUrl: string;
  androidUrl: string;
  tips: string[];
  essential: boolean;
}
