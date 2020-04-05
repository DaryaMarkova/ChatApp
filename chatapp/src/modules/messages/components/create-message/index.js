import React, { useState, useCallback } from 'react';
import { Icon, Input, Button } from 'antd';
import { FileUploader } from 'components';
import socketClient from 'utils/socket';
import { socketEvents } from 'utils/events';
import './create-message.scss';

const CreateMessage = (props) => {
  const [text, setText] = useState(null);
  const [timeout, assignTimeout] = useState(null);
  const [isTyping, setTyping] = useState(false);
  const [shouldDisplay, setDisplayed] = useState(false);

  const onMessageChanged = useCallback((e) => {
    if (e.key === 'Enter' && text) {
      createMessage()
    }
  }, [text]);
  
  const onMessageTyped = () => {
    clearTimeout(timeout);
		const { user } = props.user;
		
		const parent = props.isRoomSelected ? 
			{ room: props.activeRoom._id } : 
			{ dialog: props.dialogId }

    if (!isTyping) {
			setTyping(true);
		
			socketClient.emit(socketEvents.newMessageStartTyping(), {
				user: user,
				...parent
      })
    }

    assignTimeout(setTimeout(() => {
      setTyping(false);

      socketClient.emit(socketEvents.newMessageStopTyping(), {
				user: user,
				...parent
      })
    }, 1000));
  }

  const createMessage = data => {
    const { user } = props.user;

    const message = {
      text: text,
      user: user._id,
      fileData: data
    }

    if (props.isRoomSelected) {
      props.createRoomMessage({...message,  room: props.activeRoom._id});
    } else {
      props.createDialogMessage({...message,  dialog: props.dialogId});
    }
    
    setText('');
	}
  
  const dialogOrRoomSelected = props.dialogId || props.activeRoom;

  return (
    <div className='create-message'>
			<Button
        disabled={!dialogOrRoomSelected}
				className='attach-btn'
        shape='circle' 
        onClick={() => setDisplayed(new Boolean(true))}>
				<img src='./assets/attach_icon2.png' alt='attach icon' />
      </Button>

      <Input
        value={text}
        size='large' 
        type='textarea'
        autosize={{minRows: 1, maxRows: 6}}
        onChange={({target}) => setText(target.value)}
        onKeyDown={onMessageChanged}
        onKeyPress={onMessageTyped}
        suffix={
          <Button shape='circle'>
            <Icon type='smile' />
          </Button>
        }
        placeholder='Введите текст сообщения...' />
        
        <FileUploader 
          shouldDisplay={shouldDisplay} 
          onFilesWereSelected={data => createMessage(data)} />
    </div>
  )
}

export default CreateMessage;