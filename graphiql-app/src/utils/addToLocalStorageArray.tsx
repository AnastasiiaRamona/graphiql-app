import { RequestEntry } from '@/store/types';

export default function addToLocalStorageArray(
  key: string,
  newItem: RequestEntry
) {
  const existingArray = localStorage.getItem(key);

  const array: RequestEntry[] = existingArray ? JSON.parse(existingArray) : [];

  const itemExists = array.some((item) => item.link === newItem.link);

  if (!itemExists) {
    array.push(newItem);
    localStorage.setItem(key, JSON.stringify(array));
  }
}
