import { render, screen, fireEvent } from '@testing-library/react';
import ThemeWrapper from '@/components/ThemeWrapper/ThemeWrapper';
import { lightTheme, darkTheme } from '@/theme/theme';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/hooks/useTokenRefresh', () => ({
  default: vi.fn(),
}));
vi.mock('@/components/Header/Header', () => ({
  default: ({ toggleTheme }: { toggleTheme: () => void }) => (
    <button onClick={toggleTheme}>Toggle Theme</button>
  ),
}));
vi.mock('@/components/Footer/Footer', () => ({
  default: () => <footer>Footer</footer>,
}));
vi.mock(
  '@/components/ErrorBoundary/ErrorBoundary',
  async (
    importOriginal: () => Promise<
      typeof import('@/components/ErrorBoundary/ErrorBoundary')
    >
  ) => {
    const actual = await importOriginal();
    return {
      ...actual,
      default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
  }
);

describe('ThemeWrapper', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render with the light theme by default', () => {
    render(
      <ThemeWrapper>
        <div>Content</div>
      </ThemeWrapper>
    );

    const boxElement = screen.getByTestId('theme-box');
    expect(boxElement).toHaveStyle(
      `background: ${lightTheme.palette.background.default}`
    );
  });

  it('should render with the dark theme if localStorage is set to dark mode', () => {
    localStorage.setItem('isDarkMode', 'true');
    render(
      <ThemeWrapper>
        <div>Content</div>
      </ThemeWrapper>
    );

    const boxElement = screen.getByTestId('theme-box');
    expect(boxElement).toHaveStyle(
      `background: ${darkTheme.palette.background.default}`
    );
  });

  it('should toggle the theme between light and dark', () => {
    render(
      <ThemeWrapper>
        <div>Content</div>
      </ThemeWrapper>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('isDarkMode')).toBe('true');
    const boxElement = screen.getByTestId('theme-box');
    expect(boxElement).toHaveStyle(
      `background: ${darkTheme.palette.background.default}`
    );

    fireEvent.click(toggleButton);

    expect(localStorage.getItem('isDarkMode')).toBe('false');
    expect(boxElement).toHaveStyle(
      `background: ${lightTheme.palette.background.default}`
    );
  });
});
