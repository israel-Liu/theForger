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

  const params = new URLSearchParams(event.rawQuery || '');
  const apiPath = params.get('path');
  if (!apiPath) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing "path" query parameter' }),
    };
  }

  params.delete('path');
  const qs = params.toString();
  const targetUrl = `${CODEUP_BASE}/${apiPath}${qs ? '?' + qs : ''}`;

  try {
    const fetchOptions = {
      method: event.httpMethod,
      headers: {
        'x-yunxiao-token': token,
        'Content-Type': 'application/json',
      },
    };
    if (event.body) {
      fetchOptions.body = event.body;
    }

    const upstream = await fetch(targetUrl, fetchOptions);
    const responseBody = await upstream.text();

    return {
      statusCode: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        'X-Proxy-Target': targetUrl,
        'X-Proxy-Method': event.httpMethod,
        'X-Proxy-Upstream-Status': String(upstream.status),
      },
      body: responseBody,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Proxy fetch failed',
        message: err.message,
        targetUrl,
        method: event.httpMethod,
      }),
    };
  }
};
