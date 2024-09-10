import { renderHook, act } from '@testing-library/react';
import useControlGraphQlPage from '@/hooks/useControlGraphQlPage';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useControlGraphQlPage', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useControlGraphQlPage());

    expect(result.current.value).toBe('1');
    expect(result.current.status).toBe('');
    expect(result.current.data).toEqual({});
    expect(result.current.sdl).toBe('');
    expect(result.current.code).toBe('');
    expect(result.current.variables).toBe('');
    expect(result.current.headers).toEqual([{ key: '', value: '' }]);
  });

  it('should update value with handleChange', () => {
    const { result } = renderHook(() => useControlGraphQlPage());

    expect(result.current.value).toBe('1');
  });

  it('should update code with handleCodeChange', () => {
    const { result } = renderHook(() => useControlGraphQlPage());

    act(() => {
      result.current.handleCodeChange('new code');
    });

    expect(result.current.code).toBe('new code');
  });

  it('should update headers with updateHeaders', () => {
    const { result } = renderHook(() => useControlGraphQlPage());

    act(() => {
      result.current.updateHeaders({
        Authorization: 'Bearer token',
        'Content-Type': 'application/json',
      });
    });

    expect(result.current.headers).toEqual([
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ]);
  });

  it('should transform headers correctly', () => {
    const { result } = renderHook(() => useControlGraphQlPage());

    const transformedHeaders = result.current.transformHeaders([
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ]);

    expect(transformedHeaders).toBe(
      'Authorization=Bearer+token&Content-Type=application%2Fjson'
    );
  });
});
