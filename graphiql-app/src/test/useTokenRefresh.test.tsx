import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useTokenRefresh from '../hooks/useTokenRefresh';
import { onIdTokenChanged } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ getIdToken: vi.fn(() => Promise.resolve('token')) })),
  getIdToken: vi.fn(() => Promise.resolve('token')),
  onIdTokenChanged: vi.fn((auth, callback) => {
    callback({ getIdToken: vi.fn(() => Promise.resolve('token')) });
    return () => {};
  }),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('@/constants/constants', () => ({
  TOKEN_CHECK_INTERVAL: 1000,
}));

const TestComponent = () => {
  useTokenRefresh();
  return null;
};

describe('useTokenRefresh', () => {
  it('should call onIdTokenChanged with the correct callback', () => {
    render(<TestComponent />);
    expect(onIdTokenChanged).toHaveBeenCalled();
  });
});
