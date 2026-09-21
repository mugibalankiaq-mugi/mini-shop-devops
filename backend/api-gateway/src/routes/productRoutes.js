const { createProxyMiddleware } = require('http-proxy-middleware');

// Forward all requests to the Product Service
const productRoutes = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002',
  changeOrigin: true,
  pathFilter: '/api/products'
});

module.exports = productRoutes;
