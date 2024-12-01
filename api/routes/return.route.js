const express = require('express')
const router = express.Router()
const ReturnController = require('../controllers/return.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
 .post('/',validateAdminKey,validateJWT,AsyncHandler.handle(ReturnController.insertReturn))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(ReturnController.getReturn))
 .put('/:id',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(ReturnController.updateReturn))
 .delete('/:id',validateAdminKey,validateJWT,AsyncHandler.handle(ReturnController.deleteReturn))

module.exports = router