const express = require('express')
const router = express.Router()
const validateAdminKey = require('../middleware/validateAdminKey')
const UserController = require('../controllers/users.controller')
const AsyncHandler  = require('../utils/error-handle')



router.post('/login',validateAdminKey,AsyncHandler.handle(UserController.userLogin))
router.post('/register',validateAdminKey,AsyncHandler.handle(UserController.userRegister))
router.get('/email-verify',validateAdminKey,AsyncHandler.handle(UserController.emailVerifyAndSendOtp))
router.post('/otp-verify',validateAdminKey,AsyncHandler.handle(UserController.otpVerify))
router.post('/change-password',validateAdminKey,AsyncHandler.handle(UserController.changePassword))
router.get('/:id',validateAdminKey,AsyncHandler.handle(UserController.userInfo))

module.exports = router