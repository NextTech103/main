const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey');
const FileUploadUtil = require('../utils/file-upload');
const QueryBuilder = require('../middleware/buildQueryMiddleware')
const fileUploadUtil = new FileUploadUtil('uploads');
const AppCacheMiddleware = require('../middleware/appCachemiddleware')

const upload = fileUploadUtil.getUploader().fields([
    { name: 'icon', maxCount: 1 },  // Uploads one image for 'pimage'
  ]);

router
 .post('/',validateJWT,upload,AsyncHandler.handle(CategoryController.insertCategory))
 .get('/',AppCacheMiddleware,validateAdminKey,QueryBuilder.build,AsyncHandler.handle(CategoryController.getCategory))
 .get('/:id',QueryBuilder.build,AsyncHandler.handle(CategoryController.getSingleCategory))
 .delete('/:id',validateJWT,AsyncHandler.handle(CategoryController.deleteCategory))
 .put('/:id',validateJWT,upload,AsyncHandler.handle(CategoryController.updateCategory))

module.exports = router