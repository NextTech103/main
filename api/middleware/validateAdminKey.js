const AppError = require('../utils/app-error');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const EncryptionService = require('../utils/encrypt-dcrypt');

// Middleware function to validate JWT
async function validateAdminKey(req, res, next) {
  const encryptionService = new EncryptionService()
  // Get token from request headers (assuming it's sent in the Authorization header)
  const token = req.header('Admin-Key');
  // Check if token is not present
  if (!token) {
    return next(new AppError('Access denied. No Admin Key provided.',401))
  } 

  // Extract the token (if it's prefixed with "Bearer")
  const actualToken = token // Expected format: "Bearer <token>"

  try {
    // Verify the token using a secret key
    const decrypted = encryptionService.decrypt(actualToken);
    const existingAdmin = await Admin.findOne({ where: { id: decrypted } });
    if (existingAdmin) {
    req.adminId = existingAdmin.id;
    }
    
    // Add the decoded token to the request object for future use
    
    
    // Pass control to the next middleware or route handler
    next();
  } catch (ex) {
    console.log(ex);
    // If token is invalid or expired
    return next(new AppError('Invalid token.',401))
  }
}

module.exports = validateAdminKey;
