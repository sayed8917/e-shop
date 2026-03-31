const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post(
  '/',
  protect,
  admin,
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('stock').isNumeric().withMessage('Stock must be a number')
  ],
  createProduct
);

router.put(
  '/:id',
  protect,
  admin,
  [
    body('name').optional().trim().notEmpty(),
    body('price').optional().isNumeric(),
    body('stock').optional().isNumeric()
  ],
  updateProduct
);

router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
