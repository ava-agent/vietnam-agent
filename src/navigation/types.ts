export type RootTabParamList = {
  ChecklistTab: undefined;
  CurrencyTab: undefined;
  AppsTab: undefined;
  AttractionsTab: undefined;
};

export type ChecklistStackParamList = {
  Checklist: undefined;
  ChecklistDetail: {categoryId: string; categoryName: string};
};

export type AttractionsStackParamList = {
  Attractions: undefined;
  CityDetail: {cityId: string; cityName: string};
};
