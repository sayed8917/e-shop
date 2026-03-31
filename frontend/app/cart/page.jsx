'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div>
        <h1 className="page-title">Shopping Cart</h1>
        <div className="loading">Your cart is empty</div>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Shopping Cart</h1>
      
      <div>
        {cart.map(item => (
          <div key={item.product} className="cart-item">
            <img
              src={item.image || 'https://via.placeholder.com/100?text=Product'}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>৳{item.price.toFixed(2)}</p>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.product, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.product, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p>৳{(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.product)}
                style={{ marginTop: '0.5rem' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p className="cart-total">Total: ৳{getCartTotal().toFixed(2)}</p>
        {user ? (
          <Link href="/checkout" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
            Proceed to Checkout
          </Link>
        ) : (
          <Link href="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
