const UserController = require('../controllers/user.controller');
const DialogController = require('../controllers/dialog.controller');
const MessageController = require('../controllers/message.controller');
const RoomController = require('../controllers/room.controller');
const AttachmentController = require('../controllers/attachment.controller');

const fileUploader = require('./fs.config');

module.exports = (app, socket) => {
  const userController = new UserController(socket);
  const dialogController = new DialogController(socket);
  const messageController = new MessageController(socket);
  const roomController = new RoomController(socket);
  const attachmentController = new AttachmentController(socket);
 
  app.get('/user/:id', userController.getUserById);
  app.get('/user', userController.getUserByToken);
  app.get('/users', userController.getUsers);
  app.get('/users/search', userController.searchUsers);
  app.post('/user/register', userController.register);
  app.post('/user/login', userController.login);
  app.post('/user/logout', userController.logout)
  app.delete('/user/delete/:id', userController.delete);
  
  app.get('/dialogs', dialogController.getDialogList);
  app.delete('/dialog/:id', dialogController.delete);
  
  app.get('/messages/:id', messageController.getMessageListByDialogId);
  app.get('/rooms', roomController.getRoomList);

  app.post('/attachment/uploadfile', fileUploader.single('attachedFile'), attachmentController.create);
	app.post('/attachment/uploadfiles', fileUploader.array('attachedFiles', 5), attachmentController.createList);
  app.get('/attachment/:id', attachmentController.getOriginal)
  app.get('/attachment/small_preview/:id/', attachmentController.getPreview)
}