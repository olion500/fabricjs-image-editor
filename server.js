const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Common function to handle Budibase response
const handleBudibaseResponse = (budiResponse, res) => {
  let data = '';

  budiResponse.on('data', (chunk) => {
    data += chunk;
  });

  budiResponse.on('end', () => {
    res.status(budiResponse.statusCode);
    
    const allowedHeaders = [
      'content-type',
      'cache-control',
      'expires',
      'last-modified',
      'etag'
    ];

    allowedHeaders.forEach(header => {
      if (budiResponse.headers[header]) {
        res.setHeader(header, budiResponse.headers[header]);
      }
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-budibase-app-id, x-budibase-api-key');

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(data));
      res.send(data);
    }
  });
};

// Get table data
app.get('/api/tables/:tableId', (req, res) => {
  const options = {
    hostname: 'budibase.app',
    path: `/api/public/v1/tables/${req.params.tableId}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'x-budibase-app-id': req.headers['x-budibase-app-id'],
      'x-budibase-api-key': req.headers['x-budibase-api-key']
    }
  };

  console.log('Making request to Budibase:', options.path);
  console.log('Headers:', options.headers);

  const budiRequest = https.request(options, (budiResponse) => {
    console.log('Budibase Status Code:', budiResponse.statusCode);
    console.log('Budibase Headers:', budiResponse.headers);
    handleBudibaseResponse(budiResponse, res);
  });

  budiRequest.on('error', (error) => {
    console.error('Request Error:', error);
    res.status(500).json({
      error: 'Request Failed',
      message: error.message,
      code: error.code
    });
  });

  budiRequest.end();
});

// Search products
app.post('/api/tables/:tableId/rows/search', (req, res) => {
  const requestBody = JSON.stringify(req.body);
  
  const options = {
    hostname: 'budibase.app',
    path: `/api/public/v1/tables/${req.params.tableId}/rows/search`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
      'x-budibase-app-id': req.headers['x-budibase-app-id'],
      'x-budibase-api-key': req.headers['x-budibase-api-key']
    }
  };

  console.log('Making search request to Budibase:', options.path);
  console.log('Search Query:', req.body);
  console.log('Headers:', options.headers);

  const budiRequest = https.request(options, (budiResponse) => {
    console.log('Budibase Search Status Code:', budiResponse.statusCode);
    console.log('Budibase Search Headers:', budiResponse.headers);
    handleBudibaseResponse(budiResponse, res);
  });

  budiRequest.on('error', (error) => {
    console.error('Search Request Error:', error);
    res.status(500).json({
      error: 'Search Request Failed',
      message: error.message,
      code: error.code
    });
  });

  budiRequest.write(requestBody);
  budiRequest.end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Server Error',
    message: err.message
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 