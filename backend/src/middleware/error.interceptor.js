const logger = require('config/logger.config');

module.exports = (err, req, res, next) => {
  logger.debug(err.message);

  if (!err.statusCode) 
    err.statusCode = 500;
    
  return next(err);
}