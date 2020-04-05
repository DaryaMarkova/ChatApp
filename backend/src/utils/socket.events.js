module.exports = socketEvents = {
	userLoggedOut: userId => `USER:LOGOUT_to${userId}`,
	createMessage: 'CREATE_MESSAGE',
	newMessageIntoRoom: userId => `NEW:ROOM_MESSAGE_to${userId}`,
	newMessageIntoDialog: userId => `NEW:MESSAGE_to${userId}`,
	newMessageStartTyping: 'START_TYPING',
	newMessageStopTyping: 'STOP_TYPING'
}