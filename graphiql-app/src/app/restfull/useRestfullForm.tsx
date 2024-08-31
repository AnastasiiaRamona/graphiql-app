import React from 'react';

const useRestfullForm = () => {
  const [method, setMethod] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [headers, setHeaders] = React.useState([{ key: '', value: '' }]);
  const [body, setBody] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState('');
  const [responseBody, setResponseBody] = React.useState('');
  const [variables, setVariables] = React.useState([{ key: '', value: '' }]);
  const [showVariables, setShowVariables] = React.useState(false);

  React.useEffect(() => {
    updateUrl(method);
  }, [headers, variables]);

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
    return btoa(
      encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleRemoveVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const constructUrl = (methodOverride: string | undefined) => {
    const requestBody = prepareRequestBody();
    const baseUrl = window.location.origin;
    const encodedEndpoint = encodeToBase64(endpoint);
    const encodedBody = requestBody
      ? encodeToBase64(JSON.stringify(requestBody))
      : null;
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
      JSON.parse(text);
      return true;
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
    let requestBody = body;
    requestBody = replaceVariablesInBody(requestBody);
    if (isJson(requestBody)) {
      return JSON.stringify(JSON.parse(requestBody));
    } else {
      return requestBody;
    }
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
  };
};

export default useRestfullForm;
