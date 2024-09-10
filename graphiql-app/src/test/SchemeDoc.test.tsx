import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SchemeDoc from '../components/SchemeDoc/SchemeDoc';

vi.mock('@graphiql/react', () => ({
  GraphiQLProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DocExplorer: () => <div>DocExplorer Mock</div>,
}));

vi.mock('@graphiql/toolkit', () => ({
  createGraphiQLFetcher: () => () => Promise.resolve({ data: {} }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      openScheme: 'Open Scheme',
    };
    return translations[key] || key;
  },
}));

describe('SchemeDoc', () => {
  it('renders without errors and opens the drawer', () => {
    render(<SchemeDoc url="https://example.com/graphql" />);

    expect(screen.getByText('Open Scheme')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Scheme'));

    expect(screen.getByText('DocExplorer Mock')).toBeInTheDocument();
  });
});
