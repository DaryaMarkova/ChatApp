import React, { useState, useRef } from 'react';
import { Icon, Button, Modal, Tooltip, Input } from 'antd';
import { SearchInput } from 'components';
import { message } from 'antd';
import userApi from 'utils/api/user';
import './create-room.scss';

const CreateRoom = props => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const searchRef = useRef();
  const [users, setUsers] = useState([]);

  const createRoomWithParticipants = (users) => {
    const userId = props.user._id;
    const room = {users: [...users, userId], title, owner: userId};
    
    props.createRoom(room).then(() => {
      searchRef.current.clearData();
      setVisible(false);
    }, () => {
      message.error('Ошибка создания комнаты. Комната с данным названием уже существует')
    });
  }

  return (
    <div className='create-room'>
      <Tooltip placement='top' title={'Создать комнату'} overlayStyle={{fontSize: '12px'}}>
        <Button type='link' onClick={() => setVisible(true)}>
          <Icon type='usergroup-add' /> 
        </Button>
      </Tooltip>
      
      <Modal 
        title="Новая комната" 
        visible={visible} 
        okText= 'Создать комнату'
        cancelText='Отмена' 
        onCancel={() => {
          setVisible(false);
          searchRef.current.clearData();
        }}  
        onOk={() => createRoomWithParticipants(users)}>
          <>
            <p>Создайте комнату и пригласите в нее участников</p>
            {
              props.user && 
                <SearchInput
                  ref={searchRef}
                  user={props.user}
                  mode='multiple'
                  searchData={(pattern) => userApi.search(pattern)}
                  handleChange={(values) => {setUsers(values)}}
                  placeholder='Выберите участников'
                />
            }

            <Input 
              value={title} 
              onChange={({target}) => setTitle(target.value)} 
              placeholder='Название группы' />
          </>
      </Modal>
    </div>
  )
}

export default CreateRoom;