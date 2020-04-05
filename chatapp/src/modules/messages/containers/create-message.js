import { CreateMessage } from '../components';
import { connect } from 'react-redux';
import messageAction from 'redux/actions/message';
import roomAction from 'redux/actions/room';

export default connect(
  ({user, dialog, room}) => {
    return {
      user: user,
      dialogId: dialog.selectedId,
      activeRoom: room.activeRoom
    }
  }, dispatch => {
  return {
    createDialogMessage: (message) => dispatch(
      messageAction.createMessage(message)
    ),
    createRoomMessage: (message) => dispatch(
      roomAction.createMessage(message)
    )
  }
})(CreateMessage);