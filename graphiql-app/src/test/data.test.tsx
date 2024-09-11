import { describe, it, expect } from 'vitest';
import itemData from '@/data/data';

describe('itemData', () => {
  it('should contain the correct number of items', () => {
    expect(itemData.length).toBe(8);
  });

  it('should contain valid items with the required properties', () => {
    itemData.forEach((item, index) => {
      expect(item).toHaveProperty('img');
      expect(item).toHaveProperty('title');

      expect(item.img).not.toBeUndefined();
      expect(item.title).not.toBeUndefined();

      if (item.rows) {
        expect(item.rows).toBeGreaterThanOrEqual(1);
      }
      if (item.cols) {
        expect(item.cols).toBeGreaterThanOrEqual(1);
      }
    });
  });
});
