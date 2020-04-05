import React from 'react';

const RoomInfo = ({activeRoom}) => {
  if (!activeRoom) {
    return null;
  } else {
    return  (
      <>
        <span className='header__title'>{activeRoom.title}</span>
        <span className='header__status'>
          {
            activeRoom.users.map(it => `${it.firstname} ${it.lastname}`).join(', ')
          }
        </span>
      </>
    )
  }
}

export default RoomInfo;