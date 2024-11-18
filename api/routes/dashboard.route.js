const express = require('express')
const router = express.Router()
const DashboardController = require('../controllers/dashboard.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')

router
 .get('/top-sold',validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(DashboardController.getTopSoldProducts))
 .get('/card',validateAdminKey,validateJWT,QueryBuilder.build,AsyncHandler.handle(DashboardController.getCardStat))

module.exports = router