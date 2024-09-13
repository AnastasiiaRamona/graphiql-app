import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HistoryStorage from '@/components/HistoryStorage/HistoryStorage';
import '@testing-library/jest-dom';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

vi.mock('@/utils/formatDate', () => ({
  __esModule: true,
  default: (date: string) => date,
}));

const mockRequests = [
  {
    method: 'graphql',
    dateTime: '2024-09-12T12:00:00Z',
    link: 'some-link',
    url: 'http://example.com',
  },
  {
    method: 'GET',
    dateTime: '2024-09-11T12:00:00Z',
    link: 'another-link',
    url: 'http://example.org',
  },
];

describe('HistoryStorage', () => {
  it('renders the correct date format', () => {
    render(<HistoryStorage requests={mockRequests} />);

    expect(screen.getByText('2024-09-12T12:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('2024-09-11T12:00:00Z')).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    render(<HistoryStorage requests={mockRequests} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockRequests.length);
  });

  it('renders requests in reverse order', () => {
    render(<HistoryStorage requests={mockRequests} />);

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent(mockRequests[1].dateTime);
    expect(items[1]).toHaveTextContent(mockRequests[0].dateTime);
  });
});
