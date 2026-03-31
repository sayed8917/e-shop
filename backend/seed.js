const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

const exchangeRate = 120;

const sportsProducts = [
  {
    name: 'Adidas Soccer Ball',
    price: Math.round(29.99 * exchangeRate),
    description: 'Official size and weight soccer ball, perfect for matches',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=200&fit=crop',
    category: 'sports',
    stock: 100
  },
  {
    name: 'Wilson Tennis Racket',
    price: Math.round(89.99 * exchangeRate),
    description: 'Professional grade tennis racket with carbon fiber frame',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=300&h=200',
    category: 'sports',
    stock: 30
  },
  {
    name: 'Spalding Basketball',
    price: Math.round(34.99 * exchangeRate),
    description: 'Official NBA game ball, indoor/outdoor performance',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=300&h=200&fit=crop',
    category: 'sports',
    stock: 75
  },
  {
    name: 'Yoga Mat Pro',
    price: Math.round(49.99 * exchangeRate),
    description: 'Extra thick non-slip yoga mat, eco-friendly material',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=200&fit=crop',
    category: 'sports',
    stock: 60
  },
  {
    name: 'Adjustable Dumbbells Set',
    price: Math.round(199.99 * exchangeRate),
    description: '5-50 lb adjustable dumbbells, space-saving design',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    category: 'sports',
    stock: 25
  },
  {
    name: 'Tennis Table',
    price: Math.round(299.99 * exchangeRate),
    description: 'Professional ping pong table with net and paddles',
    image: 'https://t3.ftcdn.net/jpg/05/42/29/70/360_F_542297095_AFSrMivDh0uFO9U1bwICwLzkFvb0kuju.jpg',
    category: 'sports',
    stock: 15
  },
  {
    name: 'Cricket Bat',
    price: Math.round(79.99 * exchangeRate),
    description: 'Willow cricket bat, grade 1 English willow',
    image: 'https://static.vecteezy.com/system/resources/previews/071/218/219/non_2x/cricket-bat-ball-and-wickets-on-a-green-field-under-blue-sky-free-photo.jpg',
    category: 'sports',
    stock: 40
  }
];

const shoesProducts = [
  {
    name: 'Nike Air Max',
    price: Math.round(129.99 * exchangeRate),
    description: 'Premium running shoes with air cushioning for maximum comfort',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 50
  },
  {
    name: 'Nike Air Jordan 1',
    price: Math.round(179.99 * exchangeRate),
    description: 'Classic basketball shoes with iconic design and premium leather',
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 35
  },
  {
    name: 'Adidas Ultraboost',
    price: Math.round(159.99 * exchangeRate),
    description: 'Ultra comfortable running shoes with boost cushioning',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 45
  },
  {
    name: 'Puma Running Shoes',
    price: Math.round(89.99 * exchangeRate),
    description: 'Lightweight running shoes with breathable mesh upper',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 60
  },
  {
    name: 'New Balance 574',
    price: Math.round(99.99 * exchangeRate),
    description: 'Classic lifestyle sneakers with ENCAP midsole cushioning',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 55
  },
  {
    name: 'Reebok Classic',
    price: Math.round(79.99 * exchangeRate),
    description: 'timeless leather sneakers with soft garment upper',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9ea?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 70
  },
  {
    name: 'Asics Gel-Kayano',
    price: Math.round(139.99 * exchangeRate),
    description: 'Premium stability running shoes with GEL technology',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 40
  },
  {
    name: 'Converse Chuck Taylor',
    price: Math.round(59.99 * exchangeRate),
    description: 'Iconic canvas sneakers with rubber toe cap',
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 80
  },
  {
    name: 'Vans Old Skool',
    price: Math.round(69.99 * exchangeRate),
    description: 'Classic skate shoes with signature side stripe',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 65
  },
  {
    name: 'Under Armour Curry',
    price: Math.round(149.99 * exchangeRate),
    description: 'Basketball performance shoes with responsive cushioning',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 30
  },
  {
    name: 'Nike React Infinity',
    price: Math.round(169.99 * exchangeRate),
    description: 'Running shoes with React foam for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 42
  },
  {
    name: 'Adidas Stan Smith',
    price: Math.round(109.99 * exchangeRate),
    description: 'Classic tennis shoes with clean minimalist design',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 50
  },
  {
    name: 'Nike ZoomX Vaporfly',
    price: Math.round(259.99 * exchangeRate),
    description: 'Elite racing shoes with carbon fiber plate',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 20
  },
  {
    name: 'Brooks Ghost',
    price: Math.round(129.99 * exchangeRate),
    description: 'Neutral running shoes with DNA Loft foam',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 38
  },
  {
    name: 'Saucony Endorphin',
    price: Math.round(169.99 * exchangeRate),
    description: 'Speed running shoes with nylon plate',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 28
  },
  {
    name: 'Mizuno Wave Rider',
    price: Math.round(119.99 * exchangeRate),
    description: 'Running shoes with Wave plate technology',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 35
  },
  {
    name: 'Hoka Clifton',
    price: Math.round(145.00 * exchangeRate),
    description: 'Lightweight daily trainer with EVA foam',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 32
  },
  {
    name: 'Nike Free RN',
    price: Math.round(99.99 * exchangeRate),
    description: 'Flexible running shoes with barefoot feel',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 48
  },
  {
    name: 'Adidas NMD',
    price: Math.round(149.99 * exchangeRate),
    description: 'Modern lifestyle shoes with boost midsole',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300&h=200&fit=crop',
    category: 'shoes',
    stock: 44
  }
];

const lightProducts = [
  {
    name: 'LED Ceiling Light',
    price: Math.round(89.99 * exchangeRate),
    description: 'Modern LED ceiling light with remote control',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=200&fit=crop',
    category: 'light',
    stock: 50
  },
  {
    name: 'Table Lamp',
    price: Math.round(45.99 * exchangeRate),
    description: 'Elegant table lamp for bedroom and office',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
    category: 'light',
    stock: 60
  },
  {
    name: 'Floor Lamp',
    price: Math.round(129.99 * exchangeRate),
    description: 'Modern floor lamp with adjustable arm',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300&h=200&fit=crop',
    category: 'light',
    stock: 35
  },
  {
    name: 'Wall Sconce',
    price: Math.round(59.99 * exchangeRate),
    description: 'Modern wall sconce for hallway and bedroom',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=200&fit=crop',
    category: 'light',
    stock: 45
  },
  {
    name: 'Desk Lamp',
    price: Math.round(39.99 * exchangeRate),
    description: 'LED desk lamp with adjustable brightness',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&h=200&fit=crop',
    category: 'light',
    stock: 70
  }
];

const booksProducts = [
  {
    name: 'The Great Gatsby',
    price: Math.round(14.99 * exchangeRate),
    description: 'Classic novel by F. Scott Fitzgerald',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
    category: 'books',
    stock: 100
  },
  {
    name: '1984',
    price: Math.round(12.99 * exchangeRate),
    description: 'Dystopian novel by George Orwell',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=200&fit=crop',
    category: 'books',
    stock: 80
  },
  {
    name: 'To Kill a Mockingbird',
    price: Math.round(15.99 * exchangeRate),
    description: 'Classic by Harper Lee',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
    category: 'books',
    stock: 60
  },
  {
    name: 'The Catcher in the Rye',
    price: Math.round(11.99 * exchangeRate),
    description: 'Novel by J.D. Salinger',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop',
    category: 'books',
    stock: 75
  },
  {
    name: 'Harry Potter Complete Set',
    price: Math.round(89.99 * exchangeRate),
    description: 'All 7 books in the Harry Potter series',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/030/663/383/small/book-high-quality-4k-ultra-hd-hdr-free-photo.jpg',
    category: 'books',
    stock: 40
  }
];

const clothingProducts = [
  {
    name: 'Classic White T-Shirt',
    price: Math.round(19.99 * exchangeRate),
    description: '100% cotton white t-shirt, comfortable fit',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
    category: 'clothing',
    stock: 100
  },
  {
    name: 'Blue Jeans',
    price: Math.round(49.99 * exchangeRate),
    description: 'Classic fit blue denim jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=200&fit=crop',
    category: 'clothing',
    stock: 75
  },
  {
    name: 'Winter Jacket',
    price: Math.round(89.99 * exchangeRate),
    description: 'Warm winter jacket with hood',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=200&fit=crop',
    category: 'clothing',
    stock: 40
  },
  {
    name: 'Casual Hoodie',
    price: Math.round(39.99 * exchangeRate),
    description: 'Comfortable cotton hoodie for everyday wear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=200&fit=crop',
    category: 'clothing',
    stock: 60
  },
  {
    name: 'Formal Shirt',
    price: Math.round(34.99 * exchangeRate),
    description: 'Classic formal shirt for office wear',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop',
    category: 'clothing',
    stock: 50
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    
    await Product.deleteMany({ category: 'sports' });
    await Product.deleteMany({ category: 'shoes' });
    await Product.deleteMany({ category: 'light' });
    await Product.deleteMany({ category: 'books' });
    await Product.deleteMany({ category: 'clothing' });
    console.log('Deleted existing products');
    
    await Product.insertMany([...sportsProducts, ...shoesProducts, ...lightProducts, ...booksProducts, ...clothingProducts]);
    console.log('Added products successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedProducts();
