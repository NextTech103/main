const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/orders.controller')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const AsyncHandler  = require('../utils/error-handle')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const UpdateProductQuantitiesMiddleware = require('../middleware/UpdateProductQuantitiesMiddleware'); // Adjust path
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
  .post('/',validateAdminKey,validateJWT,UpdateProductQuantitiesMiddleware.handle,AsyncHandler.handle(OrderController.insertOrder))
  .post('/direct',validateAdminKey,validateJWT,UpdateProductQuantitiesMiddleware.handle,AsyncHandler.handle(OrderController.directSales))
  .get('/',AppCacheMiddleware,validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(OrderController.getOrder))
  .put('/:id',validateAdminKey,validateJWT,UpdateProductQuantitiesMiddleware.handle,AsyncHandler.handle(OrderController.updateOrder))

module.exports = router