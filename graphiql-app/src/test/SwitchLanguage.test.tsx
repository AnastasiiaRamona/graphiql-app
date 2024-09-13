import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SwitchLanguage from '../components/SwitchLanguage/SwitchLanguage';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SwitchLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads the language from localStorage and sets it as the default', () => {
    localStorage.setItem('language', 'ru');
    render(<SwitchLanguage />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveTextContent('RU');
  });
});
