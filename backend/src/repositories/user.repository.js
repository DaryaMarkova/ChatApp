const UserModel = require('./../schemas/user');
const encrypt = require('./../utils/encrypt');
const createJWTToken = require('./../utils/create.jwt.token');
const omit = require('lodash/omit');
const ModelRepository = require('./model.repository');

class UserRepository extends ModelRepository {
  constructor() {
    super(UserModel);
  }

  async findUsers(pattern, extractFields='-password, -last_seen') {
    if (pattern) {
      return UserModel.find({$or: [
        {firstname: {$regex: pattern, $options: 'i'}},
        {lastname: {$regex: pattern, $options: 'i'}}
      ]}, extractFields)
    }

    return UserModel.find({}, extractFields)
  }

  async loginUser(user) {
    try {
      const foundUser = await super.findModel({username: user.username});

      if (!foundUser) {
        return Promise.reject(false)
      }

      if (encrypt.validPassword(user.password, foundUser.password)) {
        const token = createJWTToken({ 
          username: user.username, 
          password: user.password 
        });
        
        const { password, ...data } = foundUser._doc;
        return Promise.resolve({...data, token});
      } else {
        return Promise.reject(false)
      }
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async registerUser(user) {
    const encryptedPassword = encrypt.generateHash(user.password);
    
    try {
      const userModel = await (new UserModel({
        ...user, 
        password: encryptedPassword
      })).save();
      return Promise.resolve(omit(userModel._doc, 'password'));
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async deleteUser(userId) {
    return super.deleteModel(userId);
  }
}

module.exports = new UserRepository();