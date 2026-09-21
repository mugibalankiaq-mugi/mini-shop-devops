const { createProxyMiddleware } = require('http-proxy-middleware');

// Forward all requests to the Order Service
const orderRoutes = createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL || 'http://localhost:5003',
  changeOrigin: true,
  pathFilter: '/api/orders'
});

module.exports = orderRoutes;
