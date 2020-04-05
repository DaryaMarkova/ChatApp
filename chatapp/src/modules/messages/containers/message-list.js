import { Messages } from '../components';
import messageActions from 'redux/actions/message';
import { connect } from 'react-redux';

export default connect(({dialog, messages, user, room}) => {
  return {
    user: user,
    dialogId: dialog.selectedId,
    activeDialog: dialog.dialogs.find(it => it._id === dialog.selectedId), // TODO: fix
    activeRoom: room.activeRoom,
    activeRoomMessages: room.activeRoomMessages,
    messages: messages
  }
}, dispatch => {
  return {
    fetchMessages: (dialogId) => dispatch(messageActions.fetchMessages(dialogId))
  }
})(Messages);
