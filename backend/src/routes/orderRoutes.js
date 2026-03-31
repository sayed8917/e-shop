const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { 
  createOrder, 
  getMyOrders, 
  getOrder, 
  getAllOrders,
  updateOrderStatus 
} = require('../controllers/orderController');

router.post(
  '/',
  protect,
  [
    body('orderItems').isArray({ min: 1 }).withMessage('Order items are required'),
    body('shippingAddress.fullName').trim().notEmpty().withMessage('Full name is required'),
    body('shippingAddress.address').trim().notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').trim().notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').trim().notEmpty().withMessage('Country is required'),
    body('paymentMethod').isIn(['cash', 'card']).withMessage('Invalid payment method'),
    body('totalPrice').isNumeric().withMessage('Total price must be a number')
  ],
  createOrder
);

router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrder);

router.get('/', protect, admin, getAllOrders);

router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
