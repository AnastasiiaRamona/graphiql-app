import React from 'react';

const useRestfullForm = () => {
  const [method, setMethod] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [headers, setHeaders] = React.useState([{ key: '', value: '' }]);
  const [body, setBody] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState('');
  const [responseBody, setResponseBody] = React.useState('');

  const handleMethodChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const newMethod = event.target.value;
    setMethod(newMethod);
  };

  const handleEndpointChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEndpoint(event.target.value);
  };

  const handleBodyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBody(event.target.value);
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const encodeToBase64 = (string: string) => {
    return btoa(string);
  };

  const constructUrl = (methodOverride: string | undefined) => {
    const baseUrl = window.location.origin;
    const encodedEndpoint = encodeToBase64(endpoint);
    const encodedBody = body ? encodeToBase64(JSON.stringify(body)) : null;
    const methodToUse = methodOverride || method;
    let queryParams = '';
    headers.forEach((header) => {
      if (header.key && header.value) {
        queryParams += `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}&`;
      }
    });

    let fullUrl = `${baseUrl}/restfull/${methodToUse}/${encodedEndpoint}`;
    if (encodedBody) {
      fullUrl += `/${encodedBody}`;
    }
    if (queryParams) {
      fullUrl += `?${queryParams.slice(0, -1)}`;
    }

    return fullUrl;
  };

  const updateUrl = (methodOverride: string | undefined) => {
    const requestUrl = constructUrl(methodOverride);
    window.history.pushState({}, '', requestUrl);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const requestHeaders = headers.reduce<Record<string, string>>(
      (acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      },
      {}
    );
    try {
      const response = await fetch(endpoint, {
        method,
        headers: requestHeaders,
        body: ['GET', 'HEAD', 'OPTIONS'].includes(method) ? null : body,
      });

      setResponseStatus(response.status.toString());
      const responseBody = await response.text();
      try {
        const formattedJson = JSON.stringify(
          JSON.parse(responseBody),
          null,
          10
        );
        setResponseBody(formattedJson);
      } catch (error) {
        setResponseBody(responseBody);
      }
    } catch (error) {
      setResponseStatus('Error');
      setResponseBody((error as Error).toString());
    }
  };

  const getColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'blue';
      case 'POST':
        return 'green';
      case 'PUT':
        return 'orange';
      case 'PATCH':
        return 'purple';
      case 'DELETE':
        return 'red';
      case 'HEAD':
        return 'brown';
      case 'OPTIONS':
        return 'teal';
      default:
        return 'black';
    }
  };

  return {
    method,
    endpoint,
    headers,
    body,
    responseStatus,
    responseBody,
    handleMethodChange,
    handleEndpointChange,
    handleBodyChange,
    handleHeaderChange,
    handleAddHeader,
    handleSubmit,
    getColor,
    constructUrl,
    updateUrl,
  };
};

export default useRestfullForm;
