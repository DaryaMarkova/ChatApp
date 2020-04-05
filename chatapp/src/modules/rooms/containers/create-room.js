import { CreateRoom } from  '../components';
import { connect } from 'react-redux';
import { roomActions } from 'redux/actions';

export default connect(({user}) => {
  return {
    user: user.user
  }
}, dispatch => {
  return {
    createRoom: (data) => dispatch(roomActions.createRoom(data)),
  }
}) (CreateRoom);