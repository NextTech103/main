const express = require('express')
const router = express.Router()
const SiteInfoController = require('../controllers/site-info.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const FileUploadUtil = require('../utils/file-upload');
const AppCacheMiddleware = require('../middleware/appCachemiddleware')
const fileUploadUtil = new FileUploadUtil('uploads');
const upload = fileUploadUtil.getUploader().fields([
    { name: 'siteIcon', maxCount: 1 },  // Uploads one image for 'pimage'
  ]);

router
 .post('/',upload,validateAdminKey,validateJWT,AsyncHandler.handle(SiteInfoController.insertSiteInfo))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(SiteInfoController.getSiteInfo))
 .put('/:id',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(SiteInfoController.updateSiteInfo))
 .delete('/:id',validateAdminKey,validateJWT,AsyncHandler.handle(SiteInfoController.deleteCategory))

module.exports = router