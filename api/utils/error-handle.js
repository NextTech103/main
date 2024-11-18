class AsyncHandler {
    static handle(fn) {
      return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
      };
    }
  }
  
  module.exports = AsyncHandler;
  