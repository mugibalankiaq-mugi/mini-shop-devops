require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());

// Health endpoints (defined BEFORE proxies so they aren't forwarded, and we can parse JSON here)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'api-gateway'
  });
});

app.get('/health/services', async (req, res) => {
  const checkService = async (url) => {
    try {
      const response = await axios.get(`${url}/health`, { timeout: 3000 });
      return response.data.status === 'ok' ? 'ok' : 'error';
    } catch (error) {
      return 'down';
    }
  };

  const userServiceURL = process.env.USER_SERVICE_URL || 'http://localhost:5001';
  const productServiceURL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
  const orderServiceURL = process.env.ORDER_SERVICE_URL || 'http://localhost:5003';

  const [userService, productService, orderService] = await Promise.all([
    checkService(userServiceURL),
    checkService(productServiceURL),
    checkService(orderServiceURL)
  ]);

  res.json({
    gateway: 'ok',
    userService,
    productService,
    orderService
  });
});

// Proxy routes
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
