import { describe, it, expect, vi } from 'vitest';
import { constructUrl, parseUrlAndSetState } from '@/utils/urlRestfull';
import { NO_ENDPOINT_PLACEHOLDER } from '@/constants/constants';

vi.mock('@/utils/base64', async () => {
  return {
    default: () => ({
      encodeToBase64: (str: string) => `encoded(${str})`,
      decodeFromBase64: (str: string) => {
        if (str.startsWith('encoded(') && str.endsWith(')')) {
          return str.slice(8, -1);
        }
        return str;
      },
    }),
  };
});

describe('constructUrl', () => {
  it('should construct URL with method, endpoint, body, and headers', () => {
    const method = 'GET';
    const endpoint = 'test-endpoint';
    const headers = [{ key: 'Content-Type', value: 'application/json' }];
    const body = '{"name":"John"}';
    const localeUrl = 'en';

    const baseUrl = window.location.origin;
    const expectedUrl = `${baseUrl}/en/GET/encoded(test-endpoint)/encoded({"name":"John"})?Content-Type=application%2Fjson`;

    const result = constructUrl(method, endpoint, headers, body, localeUrl);

    expect(result).toBe(expectedUrl);
  });

  it('should handle case with no endpoint', () => {
    const method = 'POST';
    const endpoint = NO_ENDPOINT_PLACEHOLDER;
    const headers: { key: string; value: string }[] = [];
    const body = '';
    const localeUrl = 'en';
    const baseUrl = window.location.origin;
    const expectedUrl = `${baseUrl}/en/POST/__NO_ENDPOINT__`;

    const result = constructUrl(method, endpoint, headers, body, localeUrl);

    expect(result).toBe(expectedUrl);
  });

  it('should add query parameters for headers', () => {
    const method = 'PUT';
    const endpoint = 'test-endpoint';
    const headers = [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ];
    const body = '';
    const localeUrl = 'en';
    const baseUrl = window.location.origin;
    const expectedUrl = `${baseUrl}/en/PUT/encoded(test-endpoint)?Authorization=Bearer%20token&Content-Type=application%2Fjson`;

    const result = constructUrl(method, endpoint, headers, body, localeUrl);

    expect(result).toBe(expectedUrl);
  });
});

describe('parseUrlAndSetState', () => {
  it('should parse URL and set state correctly', () => {
    const url =
      'http://localhost:3000/en/GET/encoded(test-endpoint)/encoded({"name":"John"})?Authorization=Bearer%20token';
    const localeUrl = 'en';

    const setMethod = vi.fn();
    const setEndpoint = vi.fn();
    const setBody = vi.fn();
    const setHeaders = vi.fn();

    parseUrlAndSetState(
      url,
      localeUrl,
      setMethod,
      setEndpoint,
      setBody,
      setHeaders
    );

    expect(setMethod).toHaveBeenCalledWith('GET');
    expect(setEndpoint).toHaveBeenCalledWith('test-endpoint');
    expect(setBody).toHaveBeenCalledWith('{"name":"John"}');
    expect(setHeaders).toHaveBeenCalledWith([
      { key: 'Authorization', value: 'Bearer token' },
    ]);
  });

  it('should handle case with no body and no headers', () => {
    const url = 'http://localhost:3000/en/POST/encoded(test-endpoint)';
    const localeUrl = 'en';

    const setMethod = vi.fn();
    const setEndpoint = vi.fn();
    const setBody = vi.fn();
    const setHeaders = vi.fn();

    parseUrlAndSetState(
      url,
      localeUrl,
      setMethod,
      setEndpoint,
      setBody,
      setHeaders
    );

    expect(setMethod).toHaveBeenCalledWith('POST');
    expect(setEndpoint).toHaveBeenCalledWith('test-endpoint');
    expect(setBody).toHaveBeenCalledWith('');
    expect(setHeaders).toHaveBeenCalledWith([{ key: '', value: '' }]);
  });
});
