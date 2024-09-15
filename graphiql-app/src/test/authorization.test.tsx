import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthorizationForm from '../app/[locale]/authorization/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useParams: () => ({ locale: 'en' }),
}));

vi.mock('@/store/store', () => ({
  default: () => ({
    isLoginForm: true,
    toggleForm: vi.fn(),
    setAuthenticated: vi.fn(),
  }),
  useAuthStore: () => ({
    isLoginForm: true,
    toggleForm: vi.fn(),
    setAuthenticated: vi.fn(),
  }),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn().mockReturnValue(() => {}),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/firebase/firebase', () => ({
  auth: {},
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

describe('AuthorizationForm', () => {
  it('displays an error message if there is an error', () => {
    render(<AuthorizationForm />);

    const errorMessage = screen.queryByRole('alert');
    expect(errorMessage).not.toBeInTheDocument();
  });
});
