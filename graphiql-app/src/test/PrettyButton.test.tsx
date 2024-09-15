import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PrettyButton from '../components/PrettyButton/PrettyButton';
import { handlePrettier } from '../utils/prettify';

vi.mock('../utils/prettify', () => ({
  handlePrettier: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('PrettyButton Component', () => {
  it('calls handlePrettier on button click', () => {
    const mockHandlePrettier = vi.fn();
    vi.mocked(handlePrettier).mockImplementation(mockHandlePrettier);

    render(
      <PrettyButton content="Some content" isQuery={true} onChange={() => {}} />
    );

    fireEvent.click(screen.getByText('pretty'));

    expect(mockHandlePrettier).toHaveBeenCalledWith(
      'Some content',
      true,
      expect.any(Function)
    );
  });
});
