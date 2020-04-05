import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DialogItem from './../dialog-item';
import classNames from 'classnames';
import './dialog.scss';

const Dialogs = (props) => {
  useEffect(() => {
    if (props.user && props.dialogs.length === 0) {
      props.fetchDialogs();
      props.fetchRooms();
    }  

    return () => {
      props.clearDialogs()
    }

  }, [props.user])

  const onDialogSelected = (index) => props.loadDialog(props.dialogs[index]._id); 

  if (!props.user) {
    return null;
  }

  const activeDialog = props.activeDialog;
  const getDialogUser = (item) => {
    if (props.user && props.user._id === item.author._id) {
      return item.partner;
    }

    return item.author;
  };

  return (
    <div className="dialogs">
        { 
          props.dialogs
            .map((item, index) => 
              <DialogItem 
                key={item._id} 
                className={classNames(
									{'selected' : activeDialog && activeDialog._id === item._id}, 
									{'typed': item.typed})
								} 
                user={getDialogUser(item)} 
                lastMessage={item.lastMessage}
                createdAt={item.updatedAt} 
                unread={item.unread || 0} 
                onClick={() => onDialogSelected(index)} 
              /> 
            )
        }
    </div>
  )
};
export default Dialogs;

Dialogs.propTypes = {
  dialogs: PropTypes.array
}

Dialogs.defaultProps = {
  dialogs: []
}