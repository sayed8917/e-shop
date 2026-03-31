import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  if (!user) {
    return <div className="loading">Please login to view orders</div>;
  }

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div>
      <h1 className="page-title">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="loading">No orders yet</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <strong>Order #{order._id.slice(-8)}</strong>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className={`order-status ${order.status}`}>
                  {order.status}
                </span>
                <p style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </p>
              </div>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
              {order.orderItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img
                    src={item.image || 'https://via.placeholder.com/50'}
                    alt={item.name}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {item.quantity} x ৳{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Shipping to:</strong> {order.shippingAddress.fullName}</p>
              <p style={{ color: '#6b7280' }}>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
