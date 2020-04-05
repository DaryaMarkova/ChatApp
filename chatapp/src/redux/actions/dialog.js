import dialogApi from 'utils/api/dialog';
import { messageActions } from 'redux/actions';
import socket from 'utils/socket';
import { socketEvents } from 'utils/events';

import {
  addDialogs,
  updateDialog,
  selectDialog,
  updateDialogMessage,
  searchDialogs
} from 'redux/reducers/dialog';

const Actions = {
  addDialogs: dialog => dispatch => dispatch(addDialogs(dialog)),
  searchDialogs: data => dispatch => dispatch(searchDialogs(data)),
  createDialog: data => _ => {
    const { partner, author, message } = data;

    return new Promise((resolve, _) => {
      socket.emit(socketEvents.createMessage(), {
        text: message,
        dialog: {partner, author},
        user: author
      });
      
      resolve();
    });
  },
  fetchDialogs: () => dispatch => {
    return dialogApi.getDialogs().then(({data}) => {
      dispatch(Actions.addDialogs(data))
    })
  },
  updateDialog: dialog => dispatch => dispatch(updateDialog(dialog)),
  selectDialog: dialogId => dispatch => dispatch(selectDialog(dialogId)),
  updateDialogLastMessage: message => dispatch => dispatch(updateDialogMessage(message)),
  loadDialog: dialogId => dispatch => {
    dispatch(Actions.selectDialog(dialogId));
    dispatch(messageActions.fetchMessages(dialogId))
  }
};

export default Actions;