import { render, act, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useWelcomePage } from '../hooks/useWelcomePage';
import { onAuthStateChanged } from 'firebase/auth';

vi.mock('@/firebase/firebase', () => ({
  auth: {},
}));

vi.mock('@/store/store', () => ({
  default: vi.fn(() => ({
    setAuthenticated: vi.fn(),
    isAuthenticated: true,
  })),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ displayName: 'Jon Snow' });
    return () => {};
  }),
}));

describe('useWelcomePage', () => {
  it('should update userName and loading state when auth changes', () => {
    (onAuthStateChanged as Mock).mockImplementation((_, callback) => {
      callback({ displayName: 'Jon Snow' });
      return () => {};
    });

    render(<TestComponent />);

    act(() => {
      (onAuthStateChanged as Mock).mock.calls[0][1]({
        displayName: 'Jon Snow',
      });
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Jon Snow');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });
});

const TestComponent = () => {
  const { userName, loading, showScrollUp, showScrollDown } = useWelcomePage();
  return (
    <div>
      <div data-testid="user-name">{userName}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="show-scroll-up">{showScrollUp.toString()}</div>
      <div data-testid="show-scroll-down">{showScrollDown.toString()}</div>
    </div>
  );
};
