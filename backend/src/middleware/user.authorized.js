const verifyToken = require('utils/verify.jwt.token');

module.exports = (req, res, next) => {
  if (req.path === '/user/login' || req.path === '/user/register') {
    next()
    return;
  }
  
  verifyToken(req.headers.token).then(auth => {
    req.authData = auth.data;
    next()
  }).catch(() => {
    res.status(403).json({
      message: `Invalid auth token provided`
    });
  })
}