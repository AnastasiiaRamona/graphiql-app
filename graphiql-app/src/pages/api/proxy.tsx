import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { method, url, headers = [], body = null } = req.body;

  if (!method || !url) {
    return res.status(400).json({
      error: 'Bad Request: Missing method or url in request body',
    });
  }

  const headersObj = headers.reduce(
    (acc: Record<string, string>, header: { key: string; value: string }) => {
      if (header.key) {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {}
  );

  try {
    const response = await fetch(url, {
      method,
      headers: headersObj,
      body: method === 'GET' || method === 'HEAD' ? null : body,
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return res.status(200).json({
      status: response.status,
      body: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Failed to fetch from the API',
        details: error.message,
      });
    } else {
      return res.status(500).json({
        error: 'Failed to fetch from the API',
        details: 'Unknown error',
      });
    }
  }
}
