import useHistoryStore from '@/store/historyStore';
import { notFound, useParams, usePathname } from 'next/navigation';
import { handlePrettier } from '@/utils/prettify';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import isJson from '@/utils/isJson';
import variablesRestfull from '@/utils/variablesRestfull';
import { constructUrl, parseUrlAndSetState } from '@/utils/urlRestfull';
import { NO_ENDPOINT_PLACEHOLDER } from '@/constants/constants';

const { replaceVariables, restoreVariables } = variablesRestfull();

const useRestfullForm = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [responseBody, setResponseBody] = useState('');
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [showVariables, setShowVariables] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const params = useParams();
  const localeUrl = params?.locale || 'en';
  const { addRequest } = useHistoryStore();
  const url = window.location.href;
  const pathname = url.replace(/^.*\/(en|ru)/, '/$1');

  const localeUrlString = Array.isArray(localeUrl) ? localeUrl[0] : localeUrl;

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
        parseUrlAndSetState(
          currentUrl,
          localeUrlString,
          setMethod,
          setEndpoint,
          setBody,
          setHeaders
        );
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

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(method, endpoint);
    }, 0);
    return () => clearTimeout(timer);
  }, [endpoint, method, headers]);

  const handlePrettierWithVariables = async (
    value: string,
    isGraphQl: boolean,
    onChange: (value: string) => void
  ) => {
    const { replaced, variables } = replaceVariables(value);
    await handlePrettier(replaced, isGraphQl, (formatted) => {
      const finalFormatted = restoreVariables(formatted, variables);
      onChange(finalFormatted);
    });
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

  const handleVariableChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newVariables = [...variables];
    newVariables[index][field] = value;
    setVariables(newVariables);
    updateUrl(method);
  };

  const handleAddVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
    updateUrl(method);
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

    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          url: requestEndpoint,
          headers,
          body: prepareRequestBody(),
        }),
      });

      const responseData = await response.json();
      addRequest(pathname ?? '', requestEndpoint);

      if (!response.ok) {
        setResponseStatus(`Error: ${response.status}`);
        setResponseBody(
          responseData.error || responseData.details || 'Unknown error'
        );
        toast.error(`Error: ${responseData.error || 'Unknown error'}`);
      } else {
        setResponseStatus(responseData.status.toString());
        addRequest(pathname ?? '', requestEndpoint);

        try {
          const formattedJson = JSON.stringify(
            JSON.parse(responseData.body),
            null,
            2
          );
          setResponseBody(formattedJson);
        } catch {
          setResponseBody(responseData.body);
        }
      }
    } catch (error) {
      setResponseStatus('Error');

      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
        setResponseBody(error.message);
      } else {
        toast.error('Unknown error occurred');
        setResponseBody('Unknown error');
      }
    }
  };

  const toggleVariablesSection = () => {
    setShowVariables(!showVariables);
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

  const updateUrl = (methodOverride?: string, endpointOverride?: string) => {
    const shouldInsertPlaceholder =
      !endpoint &&
      (body || headers.some((header) => header.key || header.value));
    const endpointToUse = shouldInsertPlaceholder
      ? NO_ENDPOINT_PLACEHOLDER
      : endpointOverride || endpoint || '';

    const requestUrl = constructUrl(
      methodOverride || method,
      endpointToUse,
      headers,
      prepareRequestBody(),
      localeUrlString
    );
    window.history.pushState({}, '', requestUrl);
  };

  return {
    method,
    endpoint,
    headers,
    body,
    setBody,
    setEndpoint,
    setMethod,
    setHeaders,
    responseStatus,
    responseBody,
    handlePrettierWithVariables,
    handleMethodChange,
    handleEndpointChange,
    handleBodyChange,
    handleHeaderChange,
    handleAddHeader,
    handleSubmit,
    handleRemoveHeader,
    updateUrl,
    variables,
    showVariables,
    handleVariableChange,
    handleAddVariable,
    toggleVariablesSection,
    setVariables,
    handleRemoveVariable,
    prepareRequestBody,
  };
};

export default useRestfullForm;
