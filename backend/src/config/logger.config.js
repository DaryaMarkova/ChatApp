const winston = require('winston');

winston.configure({
  transports:[
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      format: winston.format.simple(),
      colorize: true
    })
  ]
});

module.exports = winston;