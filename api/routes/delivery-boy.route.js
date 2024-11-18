const express = require('express')
const router = express.Router()
const DeliveryBoyController = require('../controllers/delivery-boy.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey');
const QueryBuilder = require('../middleware/buildQueryMiddleware')

router
 .post('/',validateJWT,AsyncHandler.handle(DeliveryBoyController.insertDeliveryBoy))
 .get('/',validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(DeliveryBoyController.getDeliveryBoy))
 .delete('/:id',validateJWT,AsyncHandler.handle(DeliveryBoyController.deleteDeliveryBoy))

module.exports = router