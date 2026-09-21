const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .delete(protect, deleteOrder);

router.route('/:id/status')
  .put(
    protect,
    [
      body('status', 'Status is required').not().isEmpty(),
    ],
    updateOrderStatus
  );

module.exports = router;
