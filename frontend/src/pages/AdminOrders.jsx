import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

function AdminOrders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="loading">Access denied</div>;
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h1 className="page-title">Manage Orders</h1>

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
                <p style={{ fontSize: '0.875rem' }}>
                  Customer: {order.user?.name || 'Unknown'} ({order.user?.email || 'N/A'})
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

            <div style={{ marginBottom: '1rem' }}>
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

            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Shipping to:</strong> {order.shippingAddress.fullName}</p>
              <p style={{ color: '#6b7280' }}>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
            </div>

            <div>
              <label style={{ marginRight: '1rem' }}>Update Status:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;
