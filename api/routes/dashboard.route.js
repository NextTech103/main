const express = require('express')
const router = express.Router()
const DashboardController = require('../controllers/dashboard.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
 .get('/top-sold',AppCacheMiddleware,validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(DashboardController.getTopSoldProducts))
 .get('/card',AppCacheMiddleware,validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(DashboardController.getCardStat))

module.exports = router