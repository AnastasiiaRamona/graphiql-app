import { notFound, useParams } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useRestfullForm = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [responseBody, setResponseBody] = useState('');
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [showVariables, setShowVariables] = useState(false);
  const params = useParams();
  const localeUrl = params.locale || 'en';
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const decodeFromBase64 = (string: string) => {
    try {
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(string), (char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch (error) {
      toast.error(`${error}`);
      return '';
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split(`/${localeUrl}/`);
    const methodFromUrl = urlParts[1]?.split('/')[0];
    const encodedEndpoint = urlParts[1]?.split('/')[1];

    if (
      !methodFromUrl ||
      !['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].includes(
        methodFromUrl
      )
    ) {
      notFound();
    } else {
      setMethod(methodFromUrl);
      if (!encodedEndpoint) {
        setAutoSubmitted(true);
      } else {
        setAutoSubmitted(false);
        parseUrlAndSetState(currentUrl);
      }
    }
  }, []);

  useEffect(() => {
    const endpointPresent = endpoint.trim() !== '';
    const methodPresent = method.trim() !== '';

    if (methodPresent && endpointPresent && !autoSubmitted) {
      handleSubmit({ preventDefault: () => {} });
      setAutoSubmitted(true);
    }
  }, [method, endpoint, headers, body, autoSubmitted]);

  const parseUrlAndSetState = (url: string) => {
    const urlParts = url.split(`/${localeUrl}/`);
    if (urlParts.length < 2) return;

    const [methodFromUrl, encodedEndpoint, encodedBodyAndParams] =
      urlParts[1].split('/');

    const [encodedBody, queryParams] = encodedBodyAndParams
      ? encodedBodyAndParams.split('?')
      : [null, null];

    if (methodFromUrl) {
      setMethod(methodFromUrl);
    }

    if (encodedEndpoint) {
      const decodedEndpoint = decodeFromBase64(encodedEndpoint);
      setEndpoint(decodedEndpoint);
    }

    if (encodedBody) {
      const decodedBody = decodeFromBase64(encodedBody);
      setBody(decodedBody);
    }

    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      const headersFromUrl = Array.from(params.entries()).map(
        ([key, value]) => ({ key, value })
      );
      setHeaders(headersFromUrl);
    }
  };

  const handleMethodChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const newMethod = event.target.value;
    setMethod(newMethod);
  };

  const handleEndpointChange = (event: { target: { value: string } }) => {
    const newEndpoint = event.target.value.trim();
    setEndpoint(newEndpoint);
    updateUrl(method, newEndpoint);
  };

  const handleBodyChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setBody(event.target.value);
  };

  const handleAddHeader = () => {
    setHeaders((prevHeaders) => {
      const newHeaders = [...prevHeaders, { key: '', value: '' }];
      return newHeaders;
    });
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    setHeaders((prevHeaders) => {
      const newHeaders = [...prevHeaders];
      newHeaders[index][field] = value;
      return newHeaders;
    });
    updateUrl(method);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders((prevHeaders) => {
      const newHeaders = prevHeaders.filter((_, i) => i !== index);
      return newHeaders;
    });
    updateUrl(method);
  };

  const handleRemoveVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
    updateUrl(method);
  };

  const encodeToBase64 = (string: string) => {
    try {
      return btoa(
        encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
    } catch (error) {
      return '';
    }
  };

  const constructUrl = (
    methodOverride: string | undefined,
    endpointOverride?: string
  ) => {
    const requestBody = prepareRequestBody();
    console.log(requestBody);
    const baseUrl = window.location.origin;
    const encodedEndpoint = encodeToBase64(endpointOverride || endpoint);
    const encodedBody = requestBody ? encodeToBase64(requestBody) : null;
    const methodToUse = methodOverride || method;
    let queryParams = '';
    headers.forEach((header) => {
      if (header.key && header.value) {
        queryParams += `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}&`;
      }
    });

    let fullUrl = `${baseUrl}/${localeUrl}/${methodToUse}/${encodedEndpoint}`;
    if (encodedBody) {
      fullUrl += `/${encodedBody}`;
    }
    if (queryParams) {
      fullUrl += `?${queryParams.slice(0, -1)}`;
    }

    return fullUrl;
  };

  const updateUrl = (
    methodOverride: string | undefined,
    endpointOverride?: string
  ) => {
    const requestUrl = constructUrl(methodOverride, endpointOverride);
    window.history.pushState({}, '', requestUrl);
  };

  const handleVariableChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newVariables = [...variables];
    newVariables[index][field] = value;
    setVariables(newVariables);
  };

  const handleAddVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const toggleVariablesSection = () => {
    setShowVariables(!showVariables);
  };

  const isJson = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      return typeof parsed === 'object' && parsed !== null;
    } catch (error) {
      return false;
    }
  };

  const replaceVariablesInBody = (body: string) => {
    let updatedBody = body;
    variables.forEach((variable) => {
      const regex = new RegExp(`{{${variable.key}}}`, 'g');
      updatedBody = updatedBody.replace(regex, variable.value);
    });
    return updatedBody;
  };

  const prepareRequestBody = () => {
    const requestBody = replaceVariablesInBody(body);
    if (isJson(requestBody)) {
      return JSON.stringify(JSON.parse(requestBody));
    } else {
      return requestBody;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let requestEndpoint = endpoint.trim();
    if (
      !requestEndpoint.startsWith('http://') &&
      !requestEndpoint.startsWith('https://')
    ) {
      requestEndpoint = `http://${requestEndpoint}`;
    }
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
      const response = await fetch(requestEndpoint, {
        method,
        headers: requestHeaders,
        body: ['GET', 'HEAD', 'OPTIONS'].includes(method)
          ? null
          : prepareRequestBody(),
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
    handleRemoveHeader,
    variables,
    showVariables,
    handleVariableChange,
    handleAddVariable,
    toggleVariablesSection,
    setVariables,
    handleRemoveVariable,
    parseUrlAndSetState,
  };
};

export default useRestfullForm;
