import { createActions, handleActions } from 'redux-actions';

const initialState = {
  rooms: [],
  activeRoom: null,
  activeRoomMessages: []
};

export const {
  appendRooms,
  selectRoom,
  updateRoom,
  appendRoomMessage,
  appendRoomMessages,
  removeMessage
} = createActions({
  APPEND_ROOMS: (rooms) => ({rooms}),
  SELECT_ROOM: (room) => ({room}),
  UPDATE_ROOM: (room) => ({room}),
  APPEND_ROOM_MESSAGE: (message) => ({message}),
  APPEND_ROOM_MESSAGES: (messages) => ({messages}),
  REMOVE_MESSAGE: (messageId) => ({messageId})
});

export default handleActions({
  [appendRooms]: (state, { payload: { rooms }} ) => {
    if (Array.isArray(rooms)) {
      return {
        ...state, 
        rooms: [
          ...rooms.map(it => it.lastMessage ? it : Object.assign(it, {lastMessage: {text: ''}}))
        ]
      }
    }

    return {
      ...state, 
      rooms: [
        rooms.lastMessage ? rooms : Object.assign(rooms, {lastMessage: {text: ''}}),
        ...state.rooms
      ]
    }
  },
  [selectRoom]: (state, { payload: { room }} ) => {
    return {
      ...state,
      activeRoom: room
    }
  },
  [updateRoom]: (state, { payload: { room }}) => {
    const index = state.rooms.findIndex(it => it._id === room._id);
      
    return {
      ...state,
      rooms: [...state.rooms.slice(0, index), room, ...state.rooms.slice(index + 1)]
    }
  },
  [appendRoomMessage]: (state, { payload: { message }}) => {
		if (message.typed) {
			return {
				...state,
				activeRoomMessages: [...state.activeRoomMessages, message]
			}
		}

		const roomIndex = state.rooms.findIndex(it => it._id === message.room._id);
		const room = {...state.rooms[roomIndex], lastMessage: message};

		return {
			...state,
			activeRoomMessages: [...state.activeRoomMessages, message],
			rooms: [
				room,
				...state.rooms.slice(0, roomIndex), 
				...state.rooms.slice(roomIndex + 1)
			]
		}
  },
  [appendRoomMessages]: (state, { payload: { messages }}) => {
		return {
			...state,
			activeRoomMessages: [
				...messages
			]
		}
	},
	[removeMessage]: (state, { payload: { messageId }}) => {
		return {
			...state,
			activeRoomMessages: state.activeRoomMessages.filter(it => it._id !== messageId)
		}
	}
}, initialState);