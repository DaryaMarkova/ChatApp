import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Time from './../time';
import Process from './../process';
import { stringToHslColor } from 'utils/helpers/color-generator';
import { FilePreview } from 'components';
import './message.scss';

const getAvatar = (user) => {
  const colorLight = stringToHslColor(user.username, 60, 70);
  const colorDark = stringToHslColor(user.username, 50, 60);

  return (  
    <span style={{background: `linear-gradient(135deg, ${colorLight}0%, ${colorDark} 96.52%)`}}>
      {user.firstname.charAt(0).toUpperCase()}
      {user.lastname.charAt(0).toUpperCase()}
    </span>
  )
}

const Message = ({user, text, timestamp, className, attachments}) => {
  return (
    <>
      <div className={classNames('message', className)}>
        <div className="message__avatar">
          {
            user && getAvatar(user)
          }
          { 
            user && user.avatar && <img src={user.avatar} alt='User icon' />
          }
        </div>

        <div className="message__content">
          <div className="message__content--text">
            <span>{text}</span>
            {
              attachments && attachments.map(file => 
                <FilePreview
                  key={file._id}
                  id={file._id}
                  originalname={file.originalname}
                  mimetype={file.mimetype} 
                  size={file.size}
                  asImage={file.asImage}
                />
              )
            }
          </div>
          
          <div className="message__content--date">
            <Time timeStamp={timestamp} />
          </div>

          <div className="message__content--typing">
            <Process />
          </div>
        </div>
      </div>
    </>
  )
};

Message.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string,
  text: PropTypes.string,
  timestamp: PropTypes.string
}

export default Message;