import { toast } from 'react-toastify';

interface GraphQLData {
  headers: { [key: string]: string };
  variables: string;
  endpoint: string;
  code: string;
}
const fetchGraphQL = async (data: GraphQLData) => {
  const headersObj: { [key: string]: string } = {};
  Object.entries(data.headers).forEach(([key, value]) => {
    headersObj[key] = value as string;
  });
  let variables;
  if (!data.variables.trim()) {
    variables = {};
  } else {
    variables = JSON.parse(data.variables);
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
      toast.error(`${error}`);
    }
  }
};
export default fetchGraphQL;
