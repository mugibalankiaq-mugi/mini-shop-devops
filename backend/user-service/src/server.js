require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'user-service'
  });
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
