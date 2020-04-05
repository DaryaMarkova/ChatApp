const logger = require('config/logger.config');
const isEmpty = require('lodash/isEmpty');

module.exports = (req, res, next) => {
  const body = !isEmpty(req.body) ? JSON.stringify(req.body) : '';
  const params = !isEmpty(req.params) ? JSON.stringify(req.params): '';

  logger.debug(`${req.method}:${req.url} ${body} ${params}`);
  next();
}