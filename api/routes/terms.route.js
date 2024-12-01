const express = require('express')
const router = express.Router()
const TermsController = require('../controllers/terms.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

router
 .post('/',validateAdminKey,validateJWT,AsyncHandler.handle(TermsController.insertTerms))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(TermsController.getTerms))
 .put('/:id',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(TermsController.updateTerms))
 .delete('/:id',validateAdminKey,validateJWT,AsyncHandler.handle(TermsController.deleteTerms))

module.exports = router