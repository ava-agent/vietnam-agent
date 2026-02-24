import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CHECKLIST_STATE: '@vietnam_guide/checklist_state',
} as const;

export type CheckedItemsMap = Record<string, boolean>;

export async function loadChecklistState(): Promise<CheckedItemsMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.CHECKLIST_STATE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveChecklistState(
  state: CheckedItemsMap,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.CHECKLIST_STATE,
      JSON.stringify(state),
    );
  } catch (e) {
    console.warn('Failed to save checklist state', e);
  }
}
