'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = ['all', 'electronics', 'clothing', 'books', 'light', 'sports', 'shoes'];

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('shoes');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?nocache=' + Date.now();
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      if (params.toString()) url += '&' + params.toString();
      
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div>
      <h1 className="page-title">Our Products</h1>
      
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="loading">No products found</div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <Link href={`/product/${product._id}`} key={product._id} className="product-card">
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">৳{product.price.toFixed(2)}</p>
                <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
