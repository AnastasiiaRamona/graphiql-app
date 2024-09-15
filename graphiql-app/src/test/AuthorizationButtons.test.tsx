import { render, screen, fireEvent } from '@testing-library/react';
import AuthorizationButtons from '../components/AuthorizationButtons/AuthorizationButtons';
import { vi } from 'vitest';
import * as useAuthStoreModule from '@/store/store';

interface UseAuthStore {
  setForm: (value: boolean) => void;
}

vi.mock('@/store/store', () => ({
  default: vi.fn(() => ({
    setForm: vi.fn(),
  })) as unknown as () => UseAuthStore,
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      questionAboutAuth: 'Do you have an account?',
      signIn: 'Sign In',
      signUp: 'Sign Up',
    };
    return translations[key];
  }),
}));

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ locale: 'en' })) as unknown as () => {
    locale?: string;
  },
}));

describe('AuthorizationButtons', () => {
  const mockSetForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useAuthStoreModule.default as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      setForm: mockSetForm,
    });
  });

  it('renders the correct text and buttons', () => {
    render(<AuthorizationButtons />);

    expect(screen.getByText('Do you have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('sets form to true when Sign In is clicked', () => {
    render(<AuthorizationButtons />);

    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    expect(mockSetForm).toHaveBeenCalledWith(true);
  });

  it('sets form to false when Sign Up is clicked', () => {
    render(<AuthorizationButtons />);

    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);

    expect(mockSetForm).toHaveBeenCalledWith(false);
  });

  it('links to the correct URLs', () => {
    render(<AuthorizationButtons />);

    const signInLink = screen.getByText('Sign In').closest('a');
    const signUpLink = screen.getByText('Sign Up').closest('a');

    expect(signInLink).toHaveAttribute('href', '/en/authorization');
    expect(signUpLink).toHaveAttribute('href', '/en/authorization');
  });
});
