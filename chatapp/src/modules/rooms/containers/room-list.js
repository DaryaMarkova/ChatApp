import { Rooms } from  '../components';
import { connect } from 'react-redux';
import { roomActions } from 'redux/actions';

export default connect(
  ({room, user}) => {
    return {
      user: user.user,
      rooms: room.rooms,
      activeRoom: room.activeRoom
    }
}, dispatch => {
  return {
    fetchRooms: () => dispatch(roomActions.fetchRooms()),
    loadRoom: (roomId) => dispatch(roomActions.loadRoom(roomId))
  }
}
) (Rooms);