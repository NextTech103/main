const express = require('express')
const app = express();
const cors = require('cors')
const { sequelize } = require('./models');  // Import sequelize instance from models
const AuthRoute = require('./routes/auth.route')
const UserRoute = require('./routes/users.route')
const ProductRoute = require('./routes/products.route')
const OrderRoute = require('./routes/orders.route')
const CoverRoute = require('./routes/cover.route')
const DeliveryRoute = require('./routes/delivery-boy.route');
const DeliveryChargeRoute = require('./routes/delivery-charge.route');
const RatingsRoute = require('./routes/ratings.route')
const CategoryRoute = require('./routes/category.route')
const DashboardRoute = require('./routes/dashboard.route')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/admin',AuthRoute)
app.use('/users',UserRoute)
app.use('/products',ProductRoute)
app.use('/orders',OrderRoute)
app.use('/covers',CoverRoute)
app.use('/delivery',DeliveryRoute)
app.use('/ratings',RatingsRoute)
app.use('/delivery-charge',DeliveryChargeRoute)
app.use('/category',CategoryRoute)
app.use('/dashboard',DashboardRoute)
// Sync all models with the database
sequelize.sync({ force: false })  // Use `force: false` or `alter: true` for production
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });
// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({
      success: false,
      message: 'Something went wrong',
      // Optionally include error stack for development (but never expose in production!)
      // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  });
app.listen('5000',(req,res)=>{
    console.log('server running on port 5000')
})