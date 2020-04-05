const bcrypt = require('bcrypt');

module.exports = {
  generateHash: (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
  },
  validPassword: (password, input) => {
    return bcrypt.compareSync(password, input)
  }
}