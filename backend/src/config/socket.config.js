const socketEvents = require('utils/socket.events');
const MessageService = new require('services/message.service');

module.exports = (http) => {
  const socket = require('socket.io')(http);
  const messageService = new MessageService(socket);

  socket.on('connection', (client) => {
    client.on(socketEvents.createMessage, message => {
      messageService.createMessage(message);
    });

    client.on(socketEvents.newMessageStartTyping, (data) => {
      socket.emit(socketEvents.newMessageStartTyping, data);
    });
  
    client.on(socketEvents.newMessageStopTyping, (data) => {
      socket.emit(socketEvents.newMessageStopTyping, data)
    });
  });
  
  return socket;
}