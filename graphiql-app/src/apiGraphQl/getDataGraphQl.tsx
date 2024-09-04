const fetchGraphQL = async (data: any) => {
  const headersObj: { [key: string]: string } = {};
  Object.entries(data.headers).forEach(([key, value]) => {
    headersObj[key] = value as string;
  });

  let variables;
  try {
    variables = JSON.parse(data.variables);
  } catch (error) {
    if (data.variables.trim()) {
      variables = data.variables;
    } else {
      variables = {};
    }
  }
  const response = await fetch(data.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headersObj,
    },
    body: JSON.stringify({
      query: data.code,
      variables: variables,
    }),
  });

  try {
    return response;
  } catch (error) {
    if (error instanceof Error) {
      error;
    }
  }
};
export default fetchGraphQL;
