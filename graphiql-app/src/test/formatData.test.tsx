import { parseISO, format } from 'date-fns';
import formatDate from '@/utils/formatDate';

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const inputDate = '2024-09-11T15:30:00Z';
    const expectedOutput = format(parseISO(inputDate), 'dd.MM.yyyy HH:mm');

    expect(formatDate(inputDate)).toBe(expectedOutput);
  });

  it('returns a formatted date even for edge cases', () => {
    const inputDate = '2020-02-29T12:00:00Z';
    const expectedOutput = format(parseISO(inputDate), 'dd.MM.yyyy HH:mm');

    expect(formatDate(inputDate)).toBe(expectedOutput);
  });
});
