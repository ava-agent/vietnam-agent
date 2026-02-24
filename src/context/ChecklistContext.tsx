import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import {
  CheckedItemsMap,
  loadChecklistState,
  saveChecklistState,
} from '../utils/storage';
import {checklistData} from '../data';

interface ChecklistContextValue {
  checkedItems: CheckedItemsMap;
  toggleItem: (itemId: string) => void;
  checkAllInCategory: (categoryId: string) => void;
  uncheckAllInCategory: (categoryId: string) => void;
  resetAll: () => void;
  getProgressForCategory: (
    categoryId: string,
  ) => {checked: number; total: number};
  getTotalProgress: () => {checked: number; total: number};
  isLoading: boolean;
}

type Action =
  | {type: 'LOAD'; payload: CheckedItemsMap}
  | {type: 'TOGGLE'; payload: string}
  | {type: 'CHECK_ALL'; payload: string[]}
  | {type: 'UNCHECK_ALL'; payload: string[]}
  | {type: 'RESET'};

function reducer(state: CheckedItemsMap, action: Action): CheckedItemsMap {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'TOGGLE':
      return {...state, [action.payload]: !state[action.payload]};
    case 'CHECK_ALL': {
      const next = {...state};
      action.payload.forEach(id => {
        next[id] = true;
      });
      return next;
    }
    case 'UNCHECK_ALL': {
      const next = {...state};
      action.payload.forEach(id => {
        next[id] = false;
      });
      return next;
    }
    case 'RESET':
      return {};
    default:
      return state;
  }
}

const ChecklistContext = createContext<ChecklistContextValue | null>(null);

export const ChecklistProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [checkedItems, dispatch] = useReducer(reducer, {});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadChecklistState().then(data => {
      dispatch({type: 'LOAD', payload: data});
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveChecklistState(checkedItems);
    }
  }, [checkedItems, isLoading]);

  const toggleItem = useCallback((itemId: string) => {
    dispatch({type: 'TOGGLE', payload: itemId});
  }, []);

  const checkAllInCategory = useCallback((categoryId: string) => {
    const category = checklistData.find(c => c.id === categoryId);
    if (category) {
      dispatch({type: 'CHECK_ALL', payload: category.items.map(i => i.id)});
    }
  }, []);

  const uncheckAllInCategory = useCallback((categoryId: string) => {
    const category = checklistData.find(c => c.id === categoryId);
    if (category) {
      dispatch({type: 'UNCHECK_ALL', payload: category.items.map(i => i.id)});
    }
  }, []);

  const resetAll = useCallback(() => {
    dispatch({type: 'RESET'});
  }, []);

  const getProgressForCategory = useCallback(
    (categoryId: string) => {
      const category = checklistData.find(c => c.id === categoryId);
      if (!category) {
        return {checked: 0, total: 0};
      }
      const total = category.items.length;
      const checked = category.items.filter(i => checkedItems[i.id]).length;
      return {checked, total};
    },
    [checkedItems],
  );

  const getTotalProgress = useCallback(() => {
    const allItems = checklistData.flatMap(c => c.items);
    const total = allItems.length;
    const checked = allItems.filter(i => checkedItems[i.id]).length;
    return {checked, total};
  }, [checkedItems]);

  return (
    <ChecklistContext.Provider
      value={{
        checkedItems,
        toggleItem,
        checkAllInCategory,
        uncheckAllInCategory,
        resetAll,
        getProgressForCategory,
        getTotalProgress,
        isLoading,
      }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error('useChecklist must be used within ChecklistProvider');
  }
  return context;
};
