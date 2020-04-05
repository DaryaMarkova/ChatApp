import React, { useEffect } from 'react';
import { withScroll } from 'containers/with.scroll';
import { Message } from 'components';
import { DialogInfo } from 'modules/dialogs/components';
import { RoomInfo } from 'modules/rooms/components';
import './message-list.scss';

const Messages = (props) => {
  useEffect(() => {
    props.scrollToBottom();  
  }, [props]);

  const { messages } = props.messages || [];
  const { user } = props.user;
  const isRoom = props.isRoomSelected;
  const displayedMessages = isRoom ? props.activeRoomMessages : messages;
  
  return (
    <div className='messages' ref={props.containerRef}>
      <div className='header'>
        {
          isRoom ? 
            <RoomInfo activeRoom={props.activeRoom} /> : 
            <DialogInfo activeDialog={props.activeDialog} user={user} />
        }
      </div>
      {
        displayedMessages.map(item => 
          <Message 
            key={item._id}
            text={item.text}
            user={item.user ? item.user : item.room.owner} 
            timestamp={item.createdAt}
            attachments={item.attachments} 
            className={getMessageClassname(item, user)}
          />
        )
      }
    </div>
  )
}

const getMessageClassname = (item, user) => {
  if (item.typed) {
    return 'aligned_left typing'
  } else if (user && item.user && user._id === item.user._id) {
    return 'aligned_right dark'
  }

  return 'aligned_left';
}

export default withScroll(Messages);