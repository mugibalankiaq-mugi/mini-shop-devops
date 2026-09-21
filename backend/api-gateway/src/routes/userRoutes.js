const { createProxyMiddleware } = require('http-proxy-middleware');

// Forward all requests to the User Service
const userRoutes = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  pathFilter: '/api/users'
});

module.exports = userRoutes;
