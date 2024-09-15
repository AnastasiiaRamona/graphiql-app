import { render } from '@testing-library/react';
import { describe, it, vi, Mock } from 'vitest';
import WelcomePage from '../app/[locale]/welcome/page';
import { useWelcomePage } from '../hooks/useWelcomePage';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('../hooks/useWelcomePage', () => ({
  useWelcomePage: vi.fn(),
}));

const mockMessages = {
  welcome: 'Welcome',
};

vi.mock('@/firebase/firebase', () => ({
  auth: {},
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUseWelcomePage = useWelcomePage as Mock;

describe('WelcomePage', () => {
  it('renders loader when loading', () => {
    mockUseWelcomePage.mockReturnValue({
      userName: '',
      loading: true,
      isAuthenticated: false,
      showScrollUp: false,
      showScrollDown: false,
      scrollByVH: vi.fn(),
    });

    render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <WelcomePage />
      </NextIntlClientProvider>
    );
  });
});
