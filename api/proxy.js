// Vercel serverless function to proxy requests to the Brazilian Chamber API
// This bypasses CORS restrictions

export default async function handler(req, res) {
  // Enable CORS for our domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the endpoint from query parameters
    const { endpoint } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    // Construct the full API URL
    const apiUrl = `https://dadosabertos.camara.leg.br/api/v2/${endpoint}`;

    console.log('Proxying request to:', apiUrl);

    // Make the request to the Brazilian Chamber API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'PEC-Bandidagem-Site/1.0'
      }
    });

    // Check if the request was successful
    if (!response.ok) {
      return res.status(response.status).json({
        error: `API returned ${response.status}: ${response.statusText}`
      });
    }

    // Get the data
    const data = await response.json();

    // Cache the response for 1 hour to reduce API calls
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    // Return the data
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to fetch data from the API',
      details: error.message
    });
  }
}