const { Op } = require('sequelize');
const AppError = require('../utils/app-error')
class QueryBuilder {
  static build(req, res, next) {
    try {
      const queryParams = req.query;
      if(req.adminId){
        req.query.adminId = req.adminId
      }
      let whereClause = {};
      let limit;
      let offset;
      let orderBy = 'DESC'; // Default order to DESC

      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          const value = queryParams[key];
          // Handle pagination parameters
          if (key === 'limit') {
            const parsedLimit = parseInt(value);
            if (!isNaN(parsedLimit) && parsedLimit > 0) {
              limit = parsedLimit;
            }
            continue;
          }
          if (key === 'page') {
            const page = parseInt(value);
            if (!isNaN(page) && page > 0) {
              offset = (page - 1) * (limit || 10);
            }
            continue;
          }
          // Handle the orderBy parameter
          if (key === 'orderby') {
            const order = value.toUpperCase();
            if (order === 'ASC' || order === 'DESC') {
              orderBy = order; // Set the order if valid
            } else {
              return next(new AppError(`Invalid orderBy value: ${value}. Must be 'ASC' or 'DESC'.`));
            }
            continue;
          }
          // Handle the 'search' and 'searchBy' parameters
          if (key === 'search') {
            const searchTerm = value;
            const searchBy = queryParams.searchBy;

            if (searchTerm && searchBy) {
              // Get the columns to search by (split the comma-separated list)
              const searchColumns = searchBy.split(',');

              // Apply search term to the selected columns
              whereClause[Op.or] = searchColumns.map((col) => ({
                [col]: { [Op.like]: `%${searchTerm}%` },
              }));
            }
            continue;
          }
          // Handle other query parameters (e.g., lt, gt, like)
          if (typeof value === 'string' && value.includes(':')) {
            const [operator, operand] = value.split(':');
            let parsedOperand = operand;


            // Handle "between" operator with two values
            if (operator === 'between' && operand.includes(',')) {
              const [min, max] = operand.split(',');
              // Check if the operands are dates (e.g., if they match a YYYY-MM-DD format)
              const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);
              // If both min and max are dates, convert them to Date objects
              if (isDate(min) && isDate(max)) {
                  whereClause[key] = { ...whereClause[key], [Op.between]: [new Date(min), new Date(max)] };
              } else {
                  // Otherwise, treat them as numbers
                  whereClause[key] = { ...whereClause[key], [Op.between]: [Number(min), Number(max)] };
              }
              continue; // Skip further processing for this key
          }

            // Convert operand based on type (number, boolean, or string)
            if (!isNaN(operand)) {
              parsedOperand = parseFloat(operand); // Numeric operand
            } else if (operand.toLowerCase() === 'true' || operand.toLowerCase() === 'false') {
              parsedOperand = operand.toLowerCase() === 'true'; // Boolean operand
            }

            switch (operator) {
              case 'lt':
                whereClause[key] = { ...whereClause[key], [Op.lt]: parsedOperand };
                break;
              case 'like':
                whereClause[key] = { ...whereClause[key], [Op.like]: `%${parsedOperand}%` };
                break;
              case 'gt':
                whereClause[key] = { ...whereClause[key], [Op.gt]: parsedOperand };
                break;
              case 'eq':
                whereClause[key] = { ...whereClause[key], [Op.eq]: parsedOperand };
                break;
              case 'ne': // Not equal case
                whereClause[key] = { ...whereClause[key], [Op.ne]: parsedOperand };
                break;
              default:
                return next(new AppError(`Invalid query parameter format for key: ${key}`));
            }
          } else {
            if (key !== 'searchBy' && key !== 'no-cache'){
               // Default behavior is an exact match
               whereClause[key] = value;
            }
            
          }
        }
      }

      // Attach the whereClause and pagination options to the request object for use in the next handler
      req.queryOptions = {
        where: whereClause,
        order: [['createdAt', orderBy]], // Assuming 'createdAt' is the field to order by
      };


      console.log(whereClause)

      // Add pagination options if provided by the user
      if (limit !== undefined) {
        req.queryOptions.limit = limit;
      }
      if (offset !== undefined) {
        req.queryOptions.offset = offset;
      }

      next();
    } catch (error) {
      return next(new AppError('Error building query',500));
    }
  }
}

module.exports = QueryBuilder;
