const UserModel = require('schemas/user');
const logger = require('config/logger.config');

module.exports = (req, _, next) => {
  if (req.authData) {
    const username = req.authData.username;
    
    UserModel.findOneAndUpdate (
      { username },
      { $set: { last_seen: new Date() } }
    ).select('-password').exec((err, user) => {
      if (err) {
        logger.err(err.stack);
      }

      req.activeUser = user;
      next();
    })
  } else {
    next()
  }
}