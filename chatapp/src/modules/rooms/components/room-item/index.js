import React from 'react';
import classNames from "classnames";
import Process from 'components/process';
import { getFormattedDate } from 'utils/helpers/time-preview';

const RoomItem = ({title, participants, onClick, updatedAt, lastMessage, className}) => {
  const creationDate = lastMessage && lastMessage.updatedAt ? new Date(lastMessage.updatedAt) : new Date(updatedAt);
  const formattedDate = getFormattedDate(creationDate);

  return (
    <div className={classNames('dialog-item', className)} onClick={onClick}>
      <div className='dialog-item__avatar'>
        <img src='./assets/group.png' alt='group icon'/> 
      </div>
      <div className='dialog-item__content'>
        <div className='dialog-item__content--fullname'>
          <span>{title} </span> 
          <span className='dialog-item__content--participants'> ( участников: {participants} )</span>
        </div>
        <div className='dialog-item__content--time'>
          {formattedDate}
        </div>
        <div className='dialog-item__content--short-message'>
          {
              lastMessage && <span>{lastMessage.text}</span>
          }
        </div>
        <div className='dialog-item__content--count-unread'>
        </div>
        <div className='dialog-item__content--typed'>
            <Process  />
        </div>
      </div>
    </div>
  )
}
export default RoomItem;