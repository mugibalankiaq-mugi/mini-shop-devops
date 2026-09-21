const { validationResult } = require('express-validator');
const prisma = require('../prisma/client');

// @desc    Get all products (with optional search and category filtering)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    let query = {
      where: {}
    };

    if (search) {
      query.where.name = {
        contains: search,
        mode: 'insensitive'
      };
    }

    if (category) {
      query.where.category = {
        equals: category,
        mode: 'insensitive'
      };
    }

    const products = await prisma.product.findMany(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving product' });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          equals: req.params.category,
          mode: 'insensitive'
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving category products' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Assume admin)
const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl,
        stock
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Assume admin)
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    const productExists = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: name !== undefined ? name : productExists.name,
        description: description !== undefined ? description : productExists.description,
        price: price !== undefined ? price : productExists.price,
        category: category !== undefined ? category : productExists.category,
        imageUrl: imageUrl !== undefined ? imageUrl : productExists.imageUrl,
        stock: stock !== undefined ? stock : productExists.stock
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Assume admin)
const deleteProduct = async (req, res) => {
  try {
    const productExists = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
