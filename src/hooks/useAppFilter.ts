import {useState, useMemo} from 'react';
import {AppCategoryType, RecommendedApp} from '../types';

export function useAppFilter(apps: RecommendedApp[]) {
  const [selectedCategory, setSelectedCategory] = useState<
    AppCategoryType | 'all'
  >('all');

  const filteredApps = useMemo(() => {
    if (selectedCategory === 'all') {
      return apps;
    }
    return apps.filter(app => app.category === selectedCategory);
  }, [apps, selectedCategory]);

  const categories: {key: AppCategoryType | 'all'; label: string}[] = [
    {key: 'all', label: '全部'},
    {key: 'transportation', label: '交通出行'},
    {key: 'navigation', label: '导航'},
    {key: 'communication', label: '通讯'},
    {key: 'accommodation', label: '住宿'},
    {key: 'payment', label: '支付'},
    {key: 'food', label: '美食'},
    {key: 'utility', label: '实用工具'},
  ];

  return {selectedCategory, setSelectedCategory, filteredApps, categories};
}
