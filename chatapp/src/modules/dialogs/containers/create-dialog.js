import { CreateDialog } from '../components';
import { connect } from 'react-redux';
import { dialogActions, messageActions } from 'redux/actions';

export default connect(
  ({user, dialog}) => {
    return {
      user: user,
      dialogs: dialog.dialogs
    }
  },
  dispatch => {
    return {
      createDialog: (data) => dispatch(dialogActions.createDialog(data)),
      updateDialog: (data) => dispatch(dialogActions.updateDialog(data)),
      createMessage: (data) => dispatch(messageActions.createMessage(data))
    }
  }
)(CreateDialog)