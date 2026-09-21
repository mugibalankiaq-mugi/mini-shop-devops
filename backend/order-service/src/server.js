require('dotenv').config();
const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'order-service'
  });
});

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
