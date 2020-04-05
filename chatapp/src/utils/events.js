export const socketEvents = {
  newDialogMessage: (userId) => `NEW:MESSAGE_to${userId}`, 
  newRoomMessage: (userId) => `NEW:ROOM_MESSAGE_to${userId}`,
  loggedOut: (userId) => `USER:LOGOUT_to${userId}`,
  newMessageStartTyping: () => 'START_TYPING',
  newMessageStopTyping: () => 'STOP_TYPING',
  createMessage: () => 'CREATE_MESSAGE'
}