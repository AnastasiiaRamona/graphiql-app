import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import History from '../app/[locale]/history/page';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/firebase/firebase', () => ({
  auth: {
    onAuthStateChanged: vi.fn(),
  },
}));

vi.mock('@/hooks/useCheckingOfAuthorization');

vi.mock('@/components/Loader/Loader', () => ({
  default: vi.fn(() => <div>Loading...</div>),
}));

vi.mock('@/components/EmptyStorage/EmptyStorage', () => ({
  default: vi.fn(() => <div>No History</div>),
}));

vi.mock('@/components/HistoryStorage/HistoryStorage', () => ({
  default: vi.fn(() => <div>HistoryStorage</div>),
}));

const mockMessages = {
  history: 'History',
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('History Component', () => {
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders Loader when loading', () => {
    (
      useCheckingOfAuthorization as Mock<
        () => { loading: boolean; isAuthenticated: boolean }
      >
    ).mockReturnValue({
      loading: true,
      isAuthenticated: false,
    });

    renderWithProviders(<History />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not render if not authenticated', () => {
    (
      useCheckingOfAuthorization as Mock<
        () => { loading: boolean; isAuthenticated: boolean }
      >
    ).mockReturnValue({
      loading: false,
      isAuthenticated: false,
    });

    const { container } = renderWithProviders(<History />);
    expect(container.firstChild).toBeNull();
  });

  it('renders EmptyStorage when no history is available', () => {
    (
      useCheckingOfAuthorization as Mock<
        () => { loading: boolean; isAuthenticated: boolean }
      >
    ).mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    renderWithProviders(<History />);
    expect(screen.getByText('No History')).toBeInTheDocument();
  });

  it('renders HistoryStorage when history is available', () => {
    localStorage.setItem(
      'queryHubHistory',
      JSON.stringify([{ id: 1, request: 'GET /api/test' }])
    );

    (
      useCheckingOfAuthorization as Mock<
        () => { loading: boolean; isAuthenticated: boolean }
      >
    ).mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    renderWithProviders(<History />);
    expect(screen.getByText('HistoryStorage')).toBeInTheDocument();
  });
});
