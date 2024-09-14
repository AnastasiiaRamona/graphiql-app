import { describe, expect, it, vi } from 'vitest';
import { handlePrettier } from '@/utils/prettify';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('handlePrettier', () => {
  it('should format GraphQL code correctly', async () => {
    const onChange = vi.fn();
    const value = 'query { user { name age } }';
    await handlePrettier(value, true, onChange);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      'query {\n  user {\n    name\n    age\n  }\n}\n'
    );
  });

  it('should display error toast when formatting fails', async () => {
    const onChange = vi.fn();
    const value = '{ invalid json }';
    await handlePrettier(value, false, onChange);
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Error formatting code');
  });
});
