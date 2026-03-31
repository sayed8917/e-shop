'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

function Navbar() {
  const { user, logout, token } = useAuth();
  const { getCartCount } = useCart();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchPendingOrders();
      const interval = setInterval(fetchPendingOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [user, token]);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const pending = data.orders?.filter(o => o.status === 'pending').length || 0;
      setPendingCount(pending);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">E-Shop</Link>
        
        <div className="navbar-links">
          <Link href="/">Home</Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <>
                  <Link href="/admin/products">Products</Link>
                  <Link href="/admin/orders" style={{ position: 'relative' }} onClick={() => setPendingCount(0)}>
                    Orders
                    {pendingCount > 0 && (
                      <span className="notification-badge">{pendingCount}</span>
                    )}
                  </Link>
                </>
              )}
              <Link href="/orders">My Orders</Link>
              <Link href="/cart" className="cart-icon">
                Cart
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
