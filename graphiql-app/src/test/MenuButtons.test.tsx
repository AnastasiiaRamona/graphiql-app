import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MenuButtons from '@/components/MenuButtons/MenuButtons';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      chooseOne: 'Choose one',
      restfullClient: 'REST Client',
      graphiqlClient: 'GraphiQL Client',
      history: 'History',
    };
    return translations[key as keyof typeof translations] || key;
  },
}));
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

describe('MenuButtons', () => {
  it('renders correctly with all buttons', () => {
    render(<MenuButtons isHistory={false} />);

    expect(screen.getByText('Choose one')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('renders without the history button when isHistory is true', () => {
    render(<MenuButtons isHistory={true} />);

    expect(screen.queryByText('History')).not.toBeInTheDocument();
  });
});
