const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/products.controller')
const AsyncHandler  = require('../utils/error-handle')
const FileUploadUtil = require('../utils/file-upload');
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey')
const QueryBuilder = require('../middleware/buildQueryMiddleware')

const fileUploadUtil = new FileUploadUtil('uploads');
const upload = fileUploadUtil.getUploader().fields([
    { name: 'pimage', maxCount: 1 },  // Uploads one image for 'pimage'
    { name: 'pimage2', maxCount: 1 }, // Uploads one image for 'pimage2'
    { name: 'pimage3', maxCount: 1 }, // Uploads one image for 'pimage3'
  ]);

router
 .post('/',validateJWT,upload,AsyncHandler.handle(ProductController.insertProduct))
 .get('/',validateAdminKey,QueryBuilder.build,AsyncHandler.handle(ProductController.getProduct))
 .get('/:id',QueryBuilder.build,AsyncHandler.handle(ProductController.getSingeProduct))
 .put('/:id',validateJWT,QueryBuilder.build,AsyncHandler.handle(ProductController.updateProduct))
 .delete('/:id',validateJWT,AsyncHandler.handle(ProductController.deleteProduct))

module.exports = router