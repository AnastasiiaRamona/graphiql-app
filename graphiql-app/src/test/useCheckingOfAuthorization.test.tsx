import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import { vi } from 'vitest';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    onAuthStateChanged: vi.fn(),
    getAuth: vi.fn().mockReturnValue({}),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useCheckingOfAuthorization', () => {
  const mockRouterPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('should redirect to welcome page if no user is authenticated', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return vi.fn();
    });

    const { result } = renderHook(() => useCheckingOfAuthorization());

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.loading;
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/en/welcome');
    expect(result.current.loading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true if user is logged in', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: 'testUser' });
      return vi.fn();
    });

    const { result } = renderHook(() => useCheckingOfAuthorization());

    act(() => {
      result.current.loading;
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
