import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from 'react-toastify';
import fetchGraphQL from '@/apiGraphQl/getDataGraphQl';

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('fetchGraphQL', () => {
  it('should send a POST request with correct headers and body', async () => {
    const toastErrorSpy = vi.spyOn(toast, 'error');
    const data = {
      headers: { Authorization: 'Bearer token' },
      variables: JSON.stringify({ key: 'value' }),
      endpoint: '/graphql-endpoint',
      code: 'query { example }',
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: 'success' }),
    });

    const response = await fetchGraphQL(data);

    expect(mockFetch).toHaveBeenCalledWith(data.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({
        query: data.code,
        variables: { key: 'value' },
      }),
    });

    expect(toastErrorSpy).not.toHaveBeenCalled();
    toastErrorSpy.mockRestore();
  });
});
