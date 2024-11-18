const { sequelize } = require('./models');

class transactionMiddleware{
  // Transaction Middleware
  static async handle(req, res, next) {
    try {
      const transaction = await sequelize.transaction(); // Start a transaction
      req.transaction = transaction; // Attach transaction to the req object
      next(); // Proceed to the next middleware
    } catch (err) {
      next(err); // Pass any errors to the error handler
    }
  }
}

module.exports = transactionMiddleware;
