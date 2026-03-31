'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cash'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          product: item.product,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: 'card',
        cardDetails: {
          last4: formData.cardNumber?.slice(-4) || '0000',
          brand: 'Visa'
        },
        totalPrice: getCartTotal()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      clearCart();
      router.push('/orders');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          product: item.product,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: getCartTotal()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      clearCart();
      router.push('/orders');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  if (cart.length === 0) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <h1 className="page-title">Checkout</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2>Shipping Information</h2>
          <form style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Card Payment</option>
              </select>
            </div>

            {formData.paymentMethod === 'card' && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber || ''}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry || ''}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv || ''}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName || ''}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </>
            )}
            
            <button 
              type="button" 
              className="btn btn-primary" 
              disabled={loading} 
              style={{ width: '100%' }}
              onClick={formData.paymentMethod === 'card' ? handleCardPayment : handleSubmit}
            >
              {loading ? 'Processing...' : `Place Order - ৳${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>৳{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ margin: '1rem 0' }} />
          <p className="cart-total">Total: ৳{getCartTotal().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
