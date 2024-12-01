const express = require('express')
const router = express.Router()
const DeliveryChargeController = require('../controllers/delivery-charge.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey');
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
 .post('/',validateAdminKey,validateJWT,AsyncHandler.handle(DeliveryChargeController.insertDeliveryCharge))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(DeliveryChargeController.getDeliveryCharge))
 .delete('/:id',validateJWT,AsyncHandler.handle(DeliveryChargeController.deleteDeliveryCharge))
 .put('/:id',validateJWT,AsyncHandler.handle(DeliveryChargeController.updateDeliveryCharge))

module.exports = router