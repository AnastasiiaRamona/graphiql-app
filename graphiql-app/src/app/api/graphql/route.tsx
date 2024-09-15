import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { endpoint, headers, variables, code } = await request.json();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query: code,
        variables: variables ? JSON.parse(variables) : {},
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error) {
      console.error('GraphQL Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown Error:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
