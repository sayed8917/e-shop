const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
  createdAt: Date
});

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: "Wireless Bluetooth Headphones", price: 79.99, description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "electronics", stock: 50, createdAt: new Date() },
  { name: "Smart Watch Pro", price: 299.99, description: "Advanced smartwatch with health tracking, GPS, and water resistance.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "electronics", stock: 30, createdAt: new Date() },
  { name: "Running Shoes Ultra", price: 129.99, description: "Lightweight running shoes with superior cushioning and grip.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "sports", stock: 45, createdAt: new Date() },
  { name: "Cotton T-Shirt Pack", price: 39.99, description: "Pack of 3 premium cotton t-shirts in various colors.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", category: "clothing", stock: 100, createdAt: new Date() },
  { name: "JavaScript: The Good Parts", price: 34.99, description: "Essential reading for every JavaScript developer.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", category: "books", stock: 25, createdAt: new Date() },
  { name: "Modern Desk Lamp", price: 49.99, description: "Adjustable LED desk lamp with multiple brightness levels.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", category: "home", stock: 40, createdAt: new Date() },
  { name: "Laptop Stand Ergonomic", price: 59.99, description: "Adjustable laptop stand for better posture and cooling.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", category: "electronics", stock: 35, createdAt: new Date() },
  { name: "Yoga Mat Premium", price: 44.99, description: "Non-slip yoga mat with carrying strap.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", category: "sports", stock: 60, createdAt: new Date() }
];

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('8 products added successfully!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
