import messageApi from 'utils/api/message';
import attachmentApi from 'utils/api/attachment';
import socket from 'utils/socket';

import {
  appendMessages,
  removeMessage
} from 'redux/reducers/messages';
import { socketEvents } from 'utils/events';

const Actions = {
  addMessages: messages => dispatch => dispatch(appendMessages(messages)),
  removeMessage: messageId => dispatch => dispatch(removeMessage(messageId)),
  fetchMessages: (dialogId) => dispatch => {
    return messageApi.getMessages(dialogId).then(({data}) => {
      dispatch(Actions.addMessages(data));
    })
  },
  createMessage: (data) => _ => {
    if (data.fileData) {
			const { files } = data.fileData;
			
      return attachmentApi.sendFiles(files).then(response => {
        const attachments = response.data;
        socket.emit(socketEvents.createMessage(), {...data, attachments});
      })
    }

    socket.emit(socketEvents.createMessage(), data);
  },
}
export default Actions;