import { describe, it, expect, beforeEach, vi } from 'vitest';
import useHistoryStore from '@/store/historyStore';
import addToLocalStorageArray from '@/utils/addToLocalStorageArray';

vi.mock('@/utils/addToLocalStorageArray', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('useHistoryStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null request', () => {
    const state = useHistoryStore.getState();
    expect(state.request).toBeNull();
  });

  it('should add a request and update state', () => {
    const link = '/GET/some-link';
    const url = 'http://example.com';

    useHistoryStore.getState().addRequest(link, url);

    const state = useHistoryStore.getState();
    expect(state.request).toEqual({
      method: 'GET',
      link: '/GET/some-link',
      dateTime: expect.any(String),
      url,
    });

    expect(addToLocalStorageArray).toHaveBeenCalledWith('queryHubHistory', {
      method: 'GET',
      link: '/GET/some-link',
      dateTime: expect.any(String),
      url,
    });
  });

  it('should clean link and determine method type correctly', () => {
    const cases = [
      {
        input: '/POST/some-path',
        expectedMethod: 'POST',
        expectedLink: '/POST/some-path',
      },
      {
        input: '/GET/another-path',
        expectedMethod: 'GET',
        expectedLink: '/GET/another-path',
      },
      {
        input: '/DELETE/yet-another-path',
        expectedMethod: 'DELETE',
        expectedLink: '/DELETE/yet-another-path',
      },
      {
        input: '/unknown/some-path',
        expectedMethod: 'UNKNOWN',
        expectedLink: '/unknown/some-path',
      },
    ];

    cases.forEach(({ input, expectedMethod, expectedLink }) => {
      useHistoryStore.getState().addRequest(input, 'http://example.com');

      const state = useHistoryStore.getState();
      expect(state.request).toEqual({
        method: expectedMethod,
        link: expectedLink,
        dateTime: expect.any(String),
        url: 'http://example.com',
      });
    });
  });
});
