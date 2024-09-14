import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Error from '../app/[locale]/error';
import ErrorProps from '@/types/types';

vi.mock('@/components/ErrorPage/ErrorPage', () => ({
  default: ({ error, reset }: ErrorProps) => (
    <div>
      <div data-testid="error-message">{error.message}</div>
      <button data-testid="reset-button" onClick={reset}>
        Reset
      </button>
    </div>
  ),
}));

describe('Error Component', () => {
  it('should render ErrorPage with the correct props', () => {
    const mockError = new globalThis.Error('Test error message');
    const mockReset = vi.fn();

    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Test error message'
    );

    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();
    resetButton.click();
    expect(mockReset).toHaveBeenCalled();
  });
});
