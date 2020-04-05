const SocketEvents = require('./../utils/socket.events');
const UserRepository = require('./../repositories/user.repository');
class UserController {
    constructor(socket) {
      this.socket = socket;
      this.getUsers = this.getUsers.bind(this);
      this.logout = this.logout.bind(this);
    }

    getUserByToken(req, res) {
      res.status(200).json(req.activeUser);
    }

    getUserById(req, res) {
      var id = req.params.id;

      UserRepository
        .findUserById(id)
        .then(user => res.json(user))
        .catch(err => res.status(401).json(err));
    }

    getUsers(_, res) {
      UserRepository
          .findUsers()
          .then(list => res.json(list))
          .catch(err => res.status(404).json(err))
    }

    searchUsers(req, res) {
      const pattern = req.query.pattern || '';

      UserRepository
        .findUsers(pattern)
        .then(list => res.status(200).json(list))
        .catch(err => res.status(404).json(err));
    }

    login(req, res) {
      UserRepository
        .loginUser(req.body)
        .then(data => res.status(200).json(data))
        .catch(_ => res.status(404).json({}))
    }

    logout(req, res) {
      this.socket.emit(SocketEvents.userLoggedOut(req.activeUser._id));
      res.status(200).json({});
    }

    register(req, res) {
      UserRepository
          .registerUser(req.body)
          .then(user => res.status(200).json(user))
          .catch(err => {
            res.status(400).json(err);
          })  
    }

    delete(req, res) {
      UserRepository
          .deleteUser(req.params.id)
          .then(_ => res.status(204))
          .catch(err => res.status(400).json(err))
    }
}

module.exports = UserController;