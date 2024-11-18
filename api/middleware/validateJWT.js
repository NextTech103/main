const AppError = require('../utils/app-error');
const jwt = require('jsonwebtoken');

// Middleware function to validate JWT
function validateJWT(req, res, next) {
  // Get token from request headers (assuming it's sent in the Authorization header)
  const token = req.header('Authorization');
  console.log(token)
  // Check if token is not present
  if (!token) {
    return next(new AppError('Access denied. No token provided.',401))
  } 

  // Extract the token (if it's prefixed with "Bearer")
  const actualToken = token // Expected format: "Bearer <token>"

  try {
    // Verify the token using a secret key
    const decoded = jwt.verify(actualToken, 'secretkey123');
    
    // Add the decoded token to the request object for future use
    req.user = decoded;
    
    // Pass control to the next middleware or route handler
    next();
  } catch (ex) {
    // If token is invalid or expired
    return next(new AppError('Invalid token.',401))
  }
}

module.exports = validateJWT;
