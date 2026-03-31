const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(async () => {
    const exists = await User.findOne({ email: 'admin@shop.com' });
    if (exists) {
      console.log('Admin user already exists');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        email: 'admin@shop.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created!');
      console.log('Email: admin@shop.com');
      console.log('Password: admin123');
    }
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
