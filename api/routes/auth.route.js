const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const AsyncHandler  = require('../utils/error-handle')
const validateJWT = require('../middleware/validateJWT');
const validateAdminKey = require('../middleware/validateAdminKey');


router.get('/token',validateAdminKey, validateJWT, AsyncHandler.handle(AuthController.validateToken)); 
router.get('/migrate',validateAdminKey, AsyncHandler.handle(AuthController.runMigration));

router.get('/:id', validateJWT, AsyncHandler.handle(AuthController.adminInfo));  // No parentheses
router.put('/:id', validateJWT, AsyncHandler.handle(AuthController.updateAdminInfo));  // No parentheses
router.post('/login', AsyncHandler.handle(AuthController.adminLogin));  // No parentheses
router.post('/register', AsyncHandler.handle(AuthController.adminRegister));  // No parentheses
router.post('/email',AsyncHandler.handle(AuthController.SendMail))

module.exports = router