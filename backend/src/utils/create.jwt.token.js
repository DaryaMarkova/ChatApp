var jwt = require('jsonwebtoken');

module.exports  = (sessionData) => {
  return jwt.sign({
    data: sessionData
  }, 
  process.env.JWT_TOKEN, 
  {
    expiresIn: process.env.JWT_MAX_AGE,
    algorithm: 'HS256'
  })
}