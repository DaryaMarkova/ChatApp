import roomApi from 'utils/api/room';
import messageApi from 'utils/api/message';
import attachmentApi from 'utils/api/attachment';
import socket from 'utils/socket';
import { socketEvents } from 'utils/events';

import { 
	appendRooms, 
	selectRoom,
	updateRoom,
	appendRoomMessage,
	appendRoomMessages,
	removeMessage
} from 'redux/reducers/room';

const Actions = {
  createRoom: (data) => _ => {
    return new Promise((resolve, _) => {
      socket.emit(socketEvents.createMessage(), {room: data});
      resolve();
    });
  },
  fetchRoomMessages: (roomId) => dispatch => {
    return messageApi.getMessages(roomId).then(({data}) => {
			dispatch(appendRoomMessages(data))
    })
  },
  createMessage: (data) => dispatch => {
    if (data.fileData) {
			const { files } = data.fileData;
			
      return attachmentApi.sendFiles(files).then(response => {
        const attachments = response.data;
        socket.emit(socketEvents.createMessage(), {...data, attachments});
      })
    }

    socket.emit(socketEvents.createMessage(), data);
  }, 
  appendRooms: rooms => dispatch => dispatch(appendRooms(rooms)),
	removeMessage: id => dispatch => dispatch(removeMessage(id)),
	appendMessage: message => dispatch => dispatch(appendRoomMessage(message)),
	updateRoom: room => dispatch => dispatch(updateRoom(room)),
	selectRoom: roomId => dispatch => dispatch(selectRoom(roomId)),
  fetchRooms: () => dispatch => {
    return roomApi.getRooms().then(({data}) => {
			dispatch(appendRooms(data))
    })
  },
  loadRoom: room => dispatch => {
		dispatch(selectRoom(room))
		dispatch(Actions.fetchRoomMessages(room._id))
  }
}
export default Actions;