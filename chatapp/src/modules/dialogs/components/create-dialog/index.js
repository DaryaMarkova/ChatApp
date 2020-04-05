import React, { useState, useCallback, useRef } from 'react';
import { Icon, Button, Modal, Input, Tooltip, message } from 'antd';
import { SearchInput } from 'components';
import userApi from 'utils/api/user';
import './create-dialog.scss';
const { TextArea } = Input;

const CreateDialog = props => {
  const [visible, setVisible] = useState(false);
  const [partner, setPartner] = useState(null);
  const [text, setText] = useState('');
  const { user } = props.user;
  const onPartnerSelected = useCallback(partner => setPartner(partner), [])
  const searchRef = useRef();

  const createDialogWithPartner = useCallback(() => {
      if (!partner) {
        return;
      }
      
      const dialogs = props.dialogs;
      const dialog = dialogs.find(it => it.author._id === partner || it.partner._id === partner);
      
      if (dialog) {
        props.createMessage({
          text: text,
          dialog: dialog._id,
          user: user._id
        })

        setText('')
        setVisible(false);
        searchRef.current.clearData();

        return;
      }

      props.createDialog({partner: partner, message: text, author: user._id}).then(
        () => {
          message.success('Диалог успешно создан');
          setText('')
          setVisible(false)
        }
      ).catch(_ => message.error('Ошибка при создании диалога. Вероятно, диалог с данным пользователем уже существует'))
    }, [props, partner, text, user]
  )

  const Search = 
    <SearchInput 
      ref={searchRef}
      user={user} 
      searchData={(pattern) => userApi.search(pattern)}
      handleChange={onPartnerSelected} />

  return (
    <div className='dialog-create'>
        <span className='dialog-create__title'>
          Диалоги
        </span>

        <Tooltip placement="top" title={'Создать диалог'} overlayStyle={{fontSize: '12px'}}>
          <Button type='link' onClick={() => setVisible(true)}>
            <Icon type='edit' /> 
          </Button>
        </Tooltip>

        <Modal 
          title="Новый диалог" 
          visible={visible}
          okText= 'Создать диалог'
          cancelText='Отмена'
          onOk={createDialogWithPartner} 
          onCancel={() => {
            setVisible(false);
            searchRef.current.clearData();
          }}>
          
          <>
            <p>Найдите собеседника по имени или фамилии и создайте с ним диалог </p>
            {
              props.user && Search
            }
      
            <TextArea
              value={text} 
              onChange={({target}) => setText(target.value)} 
              rows={3} 
              placeholder="Сообщение" />
          </>
        </Modal>
    </div>
  )
}

export default CreateDialog;