const CODEUP_BASE = 'https://codeup.aliyun.com/oapi/v1/codeup/organizations/repositories';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-yunxiao-token',
  'Access-Control-Max-Age': '86400',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const token = event.headers['x-yunxiao-token'];
  if (!token) {
    return {
      statusCode: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing x-yunxiao-token header' }),
    };
  }

  // The client sends the portion after /repositories/ as the query param "path"
  // e.g. /.netlify/functions/codeup-proxy?path=<repoId>/files&filePath=...&ref=master
  const params = new URLSearchParams(event.rawQuery || '');
  const apiPath = params.get('path');
  if (!apiPath) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing "path" query parameter' }),
    };
  }

  // Rebuild remaining query string (everything except "path")
  params.delete('path');
  const qs = params.toString();
  const targetUrl = `${CODEUP_BASE}/${apiPath}${qs ? '?' + qs : ''}`;

  try {
    const upstream = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'x-yunxiao-token': token,
        'Content-Type': 'application/json',
      },
      ...(event.body ? { body: event.body } : {}),
    });

    const responseBody = await upstream.text();

    return {
      statusCode: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
      },
      body: responseBody,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Proxy error', message: err.message }),
    };
  }
};
