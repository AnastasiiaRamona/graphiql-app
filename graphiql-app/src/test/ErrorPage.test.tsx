import { render, screen } from '@testing-library/react';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      errorTitle: 'An error occurred',
      tryAgain: 'Try Again',
    };
    return translations[key as keyof typeof translations];
  },
}));

test('renders error message and try again button', () => {
  const error = { name: 'Error', message: 'Something went wrong!' };
  const reset = vi.fn();

  render(<ErrorPage error={error} reset={reset} />);

  const errorTitle = screen.getByText('An error occurred');
  expect(errorTitle).toBeInTheDocument();

  const errorMessage = screen.getByText('Something went wrong!');
  expect(errorMessage).toBeInTheDocument();

  const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
  expect(tryAgainButton).toBeInTheDocument();

  tryAgainButton.click();
  expect(reset).toHaveBeenCalled();
});
