import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { dialogActions } from 'redux/actions'; 
import debounce  from 'lodash/debounce';

const DialogSearch = (props) => {
  const onPatternChange = debounce((pattern) => {
    if (props.isRoomSelected) {
      // TODO: search in rooms
      return;
    };
    props.searchDialogsByPattern(pattern, props.user);
  }, 300)
  
  return (
    <div className="search">
       <Input.Search 
        placeholder='Поиск...' 
        size='large' 
        onChange={e => onPatternChange(e.target.value)} />
    </div>
  )
}

export default connect(
  ({user}) => {
    return {user: user.user}
  }, 
  dispatch => {
    return {
      searchDialogsByPattern: (pattern, user) => dispatch(dialogActions.searchDialogs({pattern, user}))
    }
  }
)(DialogSearch);