import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { toast } from 'react-toastify';
import useRestfullForm from '@/hooks/useRestfullForm';

global.fetch = vi.fn();
global.window = Object.create(window);
const mockPushState = vi.fn();
Object.defineProperty(window, 'history', {
  value: {
    pushState: mockPushState,
  },
});
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost',
    href: 'http://localhost/en/',
  },
});

vi.mock('@/store/historyStore', () => ({
  default: () => ({
    addRequest: vi.fn(),
  }),
}));

vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/some-path',
  notFound: vi.fn(),
}));

vi.mock('@/utils/prettify', () => ({
  handlePrettier: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('useRestfullForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should initialize with correct default values', () => {
    const { result } = renderHook(() => useRestfullForm());

    expect(result.current.method).toBe('GET');
    expect(result.current.endpoint).toBe('');
    expect(result.current.headers).toEqual([{ key: '', value: '' }]);
    expect(result.current.body).toBe('');
    expect(result.current.responseStatus).toBe('');
    expect(result.current.responseBody).toBe('');
    expect(result.current.variables).toEqual([{ key: '', value: '' }]);
    expect(result.current.showVariables).toBe(false);
  });

  test('should handle method change', async () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleMethodChange({ target: { value: 'POST' } });
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.method).toBe('POST');
    expect(mockPushState).toHaveBeenCalled();
  });

  test('should add a new header', () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleAddHeader();
    });

    expect(result.current.headers.length).toBe(2);
    expect(result.current.headers[1]).toEqual({ key: '', value: '' });
  });

  test('should update header', () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleHeaderChange(0, 'key', 'Content-Type');
      result.current.handleHeaderChange(0, 'value', 'application/json');
    });

    expect(result.current.headers[0]).toEqual({
      key: 'Content-Type',
      value: 'application/json',
    });
  });

  test('should remove header', () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleAddHeader();
      result.current.handleRemoveHeader(0);
    });

    expect(result.current.headers.length).toBe(1);
  });

  test('should handle body change', () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleBodyChange({ target: { value: '{"name":"test"}' } });
    });

    expect(result.current.body).toBe('{"name":"test"}');
  });

  test('should handle adding variables', () => {
    const { result } = renderHook(() => useRestfullForm());

    act(() => {
      result.current.handleAddVariable();
    });

    expect(result.current.variables.length).toBe(2);
  });

  test('should update variables correctly', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.handleVariableChange(0, 'key', 'name');
      result.current.handleVariableChange(0, 'value', 'John');
    });
    expect(result.current.variables[0]).toEqual({ key: 'name', value: 'John' });
  });

  test('should toggle variables section', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.toggleVariablesSection();
    });
    expect(result.current.showVariables).toBe(true);
    act(() => {
      result.current.toggleVariablesSection();
    });
    expect(result.current.showVariables).toBe(false);
  });

  test('should replace variables in body', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.setVariables([{ key: 'name', value: 'test' }]);
      result.current.setBody('{"name":"{{name}}"}');
    });
    const updatedBody = result.current.prepareRequestBody();
    expect(updatedBody).toBe('{"name":"test"}');
  });

  test('should handle prettier with variables', async () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.setVariables([{ key: 'name', value: 'John' }]);
    });
    await act(async () => {
      await result.current.handlePrettierWithVariables(
        '{"name": "{{name}}"}',
        false,
        (formatted) => {
          expect(formatted).toBe('{"name": "John"}');
        }
      );
    });
  });

  test('should remove header by index', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.handleAddHeader();
      result.current.handleRemoveHeader(0);
    });
    expect(result.current.headers.length).toBe(1);
  });

  test('should add a new variable', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.handleAddVariable();
    });
    expect(result.current.variables.length).toBe(2);
    expect(result.current.variables[1]).toEqual({ key: '', value: '' });
  });

  test('should toggle variables section visibility', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.toggleVariablesSection();
    });
    expect(result.current.showVariables).toBe(true);
    act(() => {
      result.current.toggleVariablesSection();
    });
    expect(result.current.showVariables).toBe(false);
  });

  test('should remove a variable by index', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.handleAddVariable();
    });
    act(() => {
      result.current.handleRemoveVariable(1);
    });
    expect(result.current.variables.length).toBe(1);
  });

  test('should prepare JSON request body', () => {
    const { result } = renderHook(() => useRestfullForm());
    act(() => {
      result.current.setBody('{"name":"test"}');
    });
    const requestBody = result.current.prepareRequestBody();
    expect(requestBody).toBe('{"name":"test"}');
  });

  test('should handle error during fetch', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch'));
    const { result } = renderHook(() => useRestfullForm());
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });
    expect(result.current.responseStatus).toBe('Error');
    expect(toast.error).toHaveBeenCalledWith('Error: Failed to fetch');
  });
});
