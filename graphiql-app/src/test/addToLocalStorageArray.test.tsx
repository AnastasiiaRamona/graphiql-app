import { vi } from 'vitest';
import addToLocalStorageArray from '@/utils/addToLocalStorageArray';
import { RequestEntry } from '@/store/types';

describe('addToLocalStorageArray', () => {
  const key = 'testKey';
  const newItem: RequestEntry = {
    link: 'https://example.com',
    dateTime: '123456789',
    method: 'GET',
    url: 'https://example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should add a new item to localStorage when the array is empty', () => {
    localStorage.getItem = vi.fn().mockReturnValue(null);

    addToLocalStorageArray(key, newItem);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify([newItem])
    );
  });

  it('should not add a duplicate item to localStorage', () => {
    const existingArray = [newItem];

    localStorage.getItem = vi
      .fn()
      .mockReturnValue(JSON.stringify(existingArray));

    addToLocalStorageArray(key, newItem);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
