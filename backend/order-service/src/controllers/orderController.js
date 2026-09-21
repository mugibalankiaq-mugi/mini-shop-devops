const { validationResult } = require('express-validator');
const prisma = require('../prisma/client');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // Calculate total amount on the server
  let totalAmount = 0;
  for (const item of items) {
    // Basic validation per item
    if (item.quantity <= 0) {
      return res.status(400).json({ message: 'Item quantity must be greater than 0' });
    }
    if (item.price < 0) {
      return res.status(400).json({ message: 'Item price cannot be negative' });
    }
    totalAmount += Number(item.price) * Number(item.quantity);
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId: req.userId,
        totalAmount,
        status: 'PENDING',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Make sure the order belongs to the user
    if (order.userId !== req.userId) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving order' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (In a real app, this should be Admin only)
const updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { status } = req.body;
  const allowedStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        items: true,
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== req.userId) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await prisma.order.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Order removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting order' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
