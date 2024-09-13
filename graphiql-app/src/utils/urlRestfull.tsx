import base64 from '@/utils/base64';

const { decodeFromBase64, encodeToBase64 } = base64();
import variablesRestfull from '@/utils/variablesRestfull';

import { NO_ENDPOINT_PLACEHOLDER } from '@/constants/constants';

export const constructUrl = (
  method: string,
  endpoint: string,
  headers: { key: string; value: string }[],
  body: string,
  localeUrl: string,
  variables: Record<string, string> = {}
) => {
  const baseUrl = window.location.origin;
  let requestBody = body;
  if (body) {
    Object.entries(variables).forEach(([key, value]) => {
      const variablePattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      requestBody = requestBody.replace(variablePattern, value);
    });
    requestBody = encodeToBase64(requestBody);
  }

  const encodedEndpoint =
    endpoint === NO_ENDPOINT_PLACEHOLDER
      ? NO_ENDPOINT_PLACEHOLDER
      : encodeToBase64(endpoint || '');

  const queryParams = headers
    .filter((header) => header.key && header.value)
    .map(
      (header) =>
        `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
    )
    .join('&');

  let fullUrl = `${baseUrl}/${localeUrl}/${method}/${encodedEndpoint || ''}`;

  if (requestBody) {
    fullUrl += `/${requestBody}`;
  }

  if (queryParams) {
    fullUrl += `?${queryParams}`;
  }

  return fullUrl;
};

export const parseUrlAndSetState = (
  url: string,
  localeUrl: string,
  setMethod: (method: string) => void,
  setEndpoint: (endpoint: string) => void,
  setBody: (body: string) => void,
  setHeaders: (headers: { key: string; value: string }[]) => void
) => {
  const urlParts = url.split(`/${localeUrl}/`);
  if (urlParts.length < 2) return;

  const [methodFromUrl, ...restOfUrl] = urlParts[1].split('/');
  const restOfUrlJoined = restOfUrl.join('/');
  const [urlWithoutParams, params] = restOfUrlJoined.split('?');
  const [encodedEndpoint, encodedBody] = urlWithoutParams.split('/');
  if (methodFromUrl) {
    setMethod(methodFromUrl);
  }
  if (encodedEndpoint === NO_ENDPOINT_PLACEHOLDER) {
    setEndpoint('');
  } else if (encodedEndpoint) {
    const decodedEndpoint = decodeFromBase64(encodedEndpoint);
    setEndpoint(decodedEndpoint);
  }
  if (encodedBody) {
    const decodedBody = decodeFromBase64(encodedBody);
    setBody(decodedBody);
  } else {
    setBody('');
  }
  if (params) {
    const paramsObj = new URLSearchParams(params);
    const headersFromUrl = Array.from(paramsObj.entries()).map(
      ([key, value]) => ({
        key,
        value,
      })
    );
    setHeaders(headersFromUrl);
  } else {
    setHeaders([{ key: '', value: '' }]);
  }
};
