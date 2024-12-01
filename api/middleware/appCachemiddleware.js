const apicache = require('apicache');
let cache = apicache.middleware;
function AppCacheMiddleware(req, res, next) {
    // Check if the query parameter 'no-cache' is present
    console.log(req.query)
    if (req.query['no-cache']) {
        console.log('Cache disabled for this request');
        return next(); // Skip caching middleware
    }
    // Otherwise, apply cache middleware
    return cache('5 minutes')(req, res, next);
}

module.exports = AppCacheMiddleware