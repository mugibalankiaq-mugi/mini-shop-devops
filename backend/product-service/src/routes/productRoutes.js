const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Protected routes (Assume admin in a real app, keeping it open/protected based on requirements)
// The prompt didn't explicitly ask for jwt on these, but said "Create a product - Validate required fields".
// I will not enforce 'protect' middleware since they just said "Validate required fields", 
// but I have authMiddleware available if needed. I will leave it open for easy testing as requested.

router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('price', 'Price must be a valid number').isFloat({ min: 0 }),
    body('category', 'Category is required').not().isEmpty(),
    body('imageUrl', 'Image URL is required').not().isEmpty(),
    body('stock', 'Stock must be a valid integer').isInt({ min: 0 })
  ],
  createProduct
);

router.put(
  '/:id',
  [
    body('price', 'Price must be a valid number').optional().isFloat({ min: 0 }),
    body('stock', 'Stock must be a valid integer').optional().isInt({ min: 0 })
  ],
  updateProduct
);

router.delete('/:id', deleteProduct);

module.exports = router;
