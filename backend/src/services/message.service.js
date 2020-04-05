const messageRepository = require('repositories/message.repository');
const dialogRepository = require('repositories/dialog.repository');
const roomRepository = require('repositories/room.repository');
const socketEvents = require('utils/socket.events');
const isObject = require('lodash/isObject');
class MessageService {
  constructor(socket) {
    this.socket = socket;
    this.createDialogMessage = this.createDialogMessage.bind(this);
    this.createRoomMessage = this.createRoomMessage.bind(this);
  }

  createMessage(message) {
    if (message.room) {
      // it means room doesn't exists and we need to create in before passing new message there
      if (isObject(message.room)) {
        roomRepository.createRoom(message.room).then(
          room => {
            this.createRoomMessage(message, room, message.room.user);
          }
        )
        return;
      }
      // room has already existed, just creating new message 
      this.createRoomMessage(message);
    } else {
      if (isObject(message.dialog)) {
        dialogRepository.createDialog(message.dialog).then(
          dialog => {
            message.dialog = dialog._id;
            this.createDialogMessage(message);
          }
        )
        return;
      }
      
      this.createDialogMessage(message);
    }
  }

  createDialogMessage(message) {
    messageRepository.createMessageIntoDialog(message).then(
      message => {
        const event = socketEvents.newMessageIntoDialog;
        this.socket.emit(event.call(null, message.dialog.partner._id), message);
        this.socket.emit(event.call(null, message.dialog.author._id), message);
      }
    )
  }

  createRoomMessage(message, room, user) {
    if (room) {
      message.room = room._id;
      message.text =  `${room.owner.firstname} ${room.owner.lastname} основал(а) комнату ${room.title}`,
      message.user = user ? user : room.owner._id
    }

    messageRepository.createMessageIntoRoom(message).then(
      message => {
        message.room.users.forEach(it => {
          this.socket.emit(socketEvents.newMessageIntoRoom(it._id), message);
        });
    });
  }
}

module.exports = MessageService;