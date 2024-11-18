const express = require('express')
const router = express.Router()
const CoverController = require('../controllers/covers.controller')
const AsyncHandler  = require('../utils/error-handle')
const FileUploadUtil = require('../utils/file-upload');
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')

const fileUploadUtil = new FileUploadUtil('uploads');
const upload = fileUploadUtil.getUploader().fields([
    { name: 'coverimage', maxCount: 1 },  // Uploads one image for 'pimage'
  ]);

router
 .post('/',validateJWT,upload,AsyncHandler.handle(CoverController.insertCover))
 .get('/',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(CoverController.getCover))
 .delete('/:id',validateJWT,AsyncHandler.handle(CoverController.deleteCover))

module.exports = router