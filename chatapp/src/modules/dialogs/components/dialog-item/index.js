import React from 'react';
import PropTypes from 'prop-types';
import Process from 'components/process';
import classNames from "classnames";
import './dialog-item.scss';
import { stringToHslColor } from 'utils/helpers/color-generator';
import { getFormattedDate } from 'utils/helpers/time-preview';
import { Button } from 'antd';

const getAvatar = (user) => {
    if (user.avatar) {
        return  <img src={user.avatar} alt='user dialog icon' />
    } else {
        const colorLight = stringToHslColor(user.username, 60, 70);
        const colorDark = stringToHslColor(user.username, 50, 60);

        return (
            <span 
                className='dialog-item__avatar--generated' 
                style={{ background: `linear-gradient(135deg, ${colorLight}0%, ${colorDark} 96.52%)`}}>
                {user.firstname.charAt(0).toUpperCase()}
                {user.lastname.charAt(0).toUpperCase()}
            </span>
        )
    }
}

const DialogItem = ({user, lastMessage, createdAt, unread, className, onClick}) => {
    const creationDate = lastMessage && lastMessage.createdAt ? new Date(lastMessage.createdAt) : new Date(createdAt);
    const formattedDate = getFormattedDate(creationDate);

    return (
        <div className={classNames('dialog-item', className)} onClick={onClick}>
            {
               user && user.isOnline &&  <span className='dialog-item__avatar--online'></span>
            }
            <div className='dialog-item__avatar'>
               { user ? getAvatar(user) : null }
            </div>
            <div className='dialog-item__content'>
                <div className='dialog-item__content--fullname'>
                        <span>{user.firstname}</span>&nbsp;<span>{user.lastname}</span>
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
                    {
                        unread ? <Button type="primary" shape="circle" size='small'>{unread}</Button> : null
                    }
                </div>
                <div className='dialog-item__content--typed'>
                    <Process  />
                </div>
            </div>
        </div>
    )
}

DialogItem.propTypes = {
    user: PropTypes.object
}

export default DialogItem;
