export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  tip?: string;
  essential: boolean;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}
