import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header/Header';
import useAuthStore from '@/store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { describe, beforeEach, afterEach, vi, expect, Mock } from 'vitest';

vi.mock('@/store/store');
vi.mock('firebase/auth');
vi.mock('next-intl');

vi.mock('next/navigation', async (importOriginal: () => unknown) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useParams: vi.fn(() => ({ locale: 'en' })),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    })),
  };
});

vi.mock('@/hooks/useScrollPosition', () => ({
  default: vi.fn(() => false),
}));

describe('Header', () => {
  const mockSetAuthenticated = vi.fn();
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    (useAuthStore as unknown as Mock).mockReturnValue({
      setAuthenticated: mockSetAuthenticated,
    });
    (onAuthStateChanged as Mock).mockImplementation((auth, callback) => {
      callback(null);
    });
    (useTranslations as Mock).mockReturnValue((key: string) => key);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the Header component', () => {
    render(
      <Header
        window={undefined}
        toggleTheme={mockToggleTheme}
        isDarkMode={false}
      />
    );

    const headers = screen.getAllByText('QueryHub');

    expect(headers.length).toBeGreaterThan(0);

    expect(headers[0]).toBeInTheDocument();
  });

  test('triggers toggleTheme on theme switch toggle', () => {
    render(
      <Header
        window={undefined}
        toggleTheme={mockToggleTheme}
        isDarkMode={false}
      />
    );

    const switchButton = screen.getByRole('checkbox');

    expect(switchButton).not.toBeChecked();

    fireEvent.click(switchButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
