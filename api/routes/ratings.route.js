const express = require('express')
const router = express.Router()
const RatingsController = require('../controllers/ratings.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')

router
 .post('/',validateJWT,AsyncHandler.handle(RatingsController.insertRatings))
 .get('/',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(RatingsController.getRatings))
 .delete('/:id',validateJWT,AsyncHandler.handle(RatingsController.deleteRatings))

module.exports = router