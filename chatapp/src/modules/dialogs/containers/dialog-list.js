import { Dialogs } from '../components';
import { connect } from 'react-redux';
import { dialogActions, messageActions, roomActions} from 'redux/actions';

export default connect(
  ({dialog, user}) => {
    return {
      dialogs: dialog.dialogs,
      activeDialog: dialog.activeDialog,
      user: user.user
    }
  },
  dispatch => {
    return {
      fetchDialogs: () => dispatch(dialogActions.fetchDialogs()),
      fetchMessages: (dialogId) => dispatch(messageActions.fetchMessages(dialogId)),
      fetchRooms: () => dispatch(roomActions.fetchRooms()),
      loadDialog: (dialogId) => dispatch(dialogActions.loadDialog(dialogId)),
      clearDialogs: () => dispatch(dialogActions.addDialogs([]))
    }
  }
)(Dialogs)