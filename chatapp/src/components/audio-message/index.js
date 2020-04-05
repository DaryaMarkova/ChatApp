import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Time }  from './../';
import { Icon } from 'antd';
import { convertToPlayerTime } from '../../utils/helpers/time-preview';
import './audio-message.scss';
import './../message/message.scss';

const AudioMessage =  ({avatar, audio, duration, className, timestamp}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef(null);
  
  useEffect(() => {
    audioPlayer.current.volume=0.1;

    const current = audioPlayer.current;
    current.addEventListener('playing', 
      () => {}, false
    );

    current.addEventListener('pause', 
      () => {}, false
    );
    current.addEventListener('ended', 
      () => {
        setIsPlaying(false);
        setCurrentTime(0);
      }, false
    );
    current.addEventListener('timeupdate', () => {
      const currentTime = current.currentTime;
      setCurrentTime(currentTime);
    })
  }, []);

  const play = () => {
    setIsPlaying(true);
    if (audio)
      audioPlayer.current.play();
  };

  const pause = () => {
    setIsPlaying(false);
    if (audio)
      audioPlayer.current.pause();
  }

  return (
    <div className={classNames('message audio-message', className)}>
      <div className="message__avatar">
        { 
          avatar && <img src={avatar} alt='User icon' />
        }
      </div>
      <div className="message__content">
        <div className="message__content--text">
          <audio src={audio} ref={audioPlayer} preload="audio" />
          {
            isPlaying ?  
              <Icon type="pause-circle" theme='filled' onClick={pause}/> : 
              <Icon type="play-circle" theme='filled'  onClick={play} />
          }
          <span className="message__content--duration">
            {convertToPlayerTime(currentTime)} / {convertToPlayerTime(duration)}
          </span>
          
          <span 
            className="message__process" 
            style={{
              width: `${currentTime/duration*100}%`
            }}
            >
          </span>
          
        </div>
        <div className="message__content--date">
          <Time timeStamp={new Date().toISOString()} />
        </div>
      </div>
    </div>
  )
}

AudioMessage.propTypes = {
  avatar: PropTypes.string,
  audio: PropTypes.string, 
  timestamp: PropTypes.string
}

export default AudioMessage;