# E-Commerce Website

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, login, JWT-based authentication
- **Product Management**: Browse, search, filter by category
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Shipping info, payment method selection
- **Order Management**: View order history, track order status
- **Admin Panel**: Manage products (CRUD), manage orders

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **DevOps**: Docker, Docker Compose, Nginx

## Project Structure

```
ecommerce/
├── backend/           # Express API server
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── server.js     # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React Context (Auth, Cart)
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   └── index.css    # Global styles
│   ├── package.json
│   └── Dockerfile
├── nginx/            # Nginx configuration
│   └── nginx.conf
├── database/         # Database scripts
│   └── seed.js       # Sample data
├── docker-compose.yml
└── README.md
```

## Running Locally (Without Docker)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
# Create .env file (see .env.example)
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Running with Docker

### Prerequisites
- Docker
- Docker Compose

### Quick Start

```bash
# Clone the repository
cd ecommerce

# Start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Access the Application

- Website: http://localhost
- MongoDB: localhost:27017

### Default Admin Account

After seeding, you can create an admin user through:
1. Register a new account
2. Manually update the user's role to 'admin' in MongoDB

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## API Endpoints

### Products
- `GET /api/products` - List all products (with pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## Deployment on a Server

### 1. Prepare the Server

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt-get install docker-compose
```

### 2. Deploy

```bash
# Clone and navigate to project
cd ecommerce

# Start the application
docker-compose -f docker-compose.yml up -d --build
```

### 3. Production Considerations

1. **Environment Variables**: Update `.env` with secure values:
   - `JWT_SECRET`: Generate a strong random string
   - `MONGO_URI`: Use production MongoDB credentials

2. **Nginx SSL**: For HTTPS, update nginx.conf:
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    # ... rest of config
}

server {
    listen 80;
    return 301 https://$server_name$request_uri;
}
```

3. **Firewall**: Open necessary ports:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

4. **Monitoring**: Consider adding:
   - Docker health checks
   - Log management (e.g., docker-compose logs)
   - Backup strategy for MongoDB

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB container is running: `docker-compose ps`
- View logs: `docker-compose logs database`

### Frontend Not Loading
- Check if frontend container is running
- Verify nginx configuration
- Check browser console for errors

### Admin Access
- Create a user through the registration page
- Access MongoDB and manually update the role:
```javascript
docker exec -it ecommerce-db mongosh -u admin -p admin123
use ecommerce
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

## License

MIT
