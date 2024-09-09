import { render, screen } from '@testing-library/react';
import Error from '@/app/[locale]/graphql/error';
import ErrorProps from '@/types/types';
import { vi } from 'vitest';

vi.mock('@/components/ErrorPage/ErrorPage', () => ({
  default: ({ error, reset }: ErrorProps) => (
    <div>
      <h1>{error.message}</h1>
      <button onClick={reset}>Reset</button>
    </div>
  ),
}));

test('renders ErrorPage with correct props', () => {
  const mockError = { name: 'Error', message: 'Something went wrong!' };
  const mockReset = vi.fn();

  render(<Error error={mockError} reset={mockReset} />);

  const errorMessage = screen.getByText('Something went wrong!');
  expect(errorMessage).toBeInTheDocument();

  const resetButton = screen.getByText('Reset');
  expect(resetButton).toBeInTheDocument();

  resetButton.click();
  expect(mockReset).toHaveBeenCalled();
});
