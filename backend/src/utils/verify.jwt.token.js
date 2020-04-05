const jwt = require('jsonwebtoken');

const verify = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_TOKEN, (err, decodedUser) => {
    if (err || !decodedUser) {
      return reject(err);
    }

    resolve(decodedUser);
  });
})

module.exports = verify;