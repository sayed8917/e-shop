'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    addToCart(product, quantity);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <div>
      <div className="product-detail">
        <img
          src={product.image || 'https://via.placeholder.com/400x400?text=Product'}
          alt={product.name}
          className="product-detail-image"
        />
        
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-price">৳{product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          
          <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          {product.stock > 0 && (
            <>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ marginTop: '1rem' }}
              >
                Add to Cart
              </button>
            </>
          )}

          {message && (
            <div className="alert alert-success" style={{ marginTop: '1rem' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
