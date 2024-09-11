import { describe, it, expect } from 'vitest';
import formatDate from '@/utils/formatDate';
describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const inputDate = '2024-09-11T15:30:00Z';
    const expectedOutput = '11.09.2024 18:30';

    expect(formatDate(inputDate)).toBe(expectedOutput);
  });

  it('returns a formatted date even for edge cases', () => {
    const inputDate = '2020-02-29T12:00:00Z';
    const expectedOutput = '29.02.2020 14:00';

    expect(formatDate(inputDate)).toBe(expectedOutput);
  });
});
