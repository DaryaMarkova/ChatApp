import React, { useEffect } from 'react';
import { RoomItem } from 'modules/rooms/components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Rooms = (props) => {
  useEffect(() => {
    if (props.user && props.rooms.length === 0) {
      props.fetchRooms()
    }  
  }, [props.user])

  const onRoomSelected = (index) => props.loadRoom(props.rooms[index])

  return (
    <div className='rooms'>
      {
        props.rooms.map((item, index) => 
          <RoomItem 
            key={item._id}
            className={classNames(
              {'selected': props.activeRoom && item._id === props.activeRoom._id},
              {'typed': item.typed})
            }
            title={item.title} 
            lastMessage={item.lastMessage}
            participants={item.users.length} 
            updatedAt={item.updatedAt}
            onClick={() => onRoomSelected(index)}
          />
        )
      }
    </div>
  )
}
export default Rooms;

Rooms.propTypes = {
  rooms: PropTypes.array
}

Rooms.defaultProps = {
  rooms: []
}