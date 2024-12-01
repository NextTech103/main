const express = require('express')
const router = express.Router()
const PrivacyController = require('../controllers/privacy.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
 .post('/',validateAdminKey,validateJWT,AsyncHandler.handle(PrivacyController.insertPrivacy))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(PrivacyController.getPrivacy))
 .put('/:id',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(PrivacyController.updatePrivacy))
 .delete('/:id',validateAdminKey,validateJWT,AsyncHandler.handle(PrivacyController.deletePrivacy))

module.exports = router