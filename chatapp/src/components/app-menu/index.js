import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { userActions } from 'redux/actions';

import './app-menu.scss';

const AppMenu = props => {
  const menuOptions = (
    <Menu>
      <Menu.Item onClick={props.logout}>
        <span>
          Выход&nbsp;
          <Icon type='logout' />
        </span>
      </Menu.Item>
    </Menu>
  )

  if (!props.user) {
    return null;
  }

  return (
    <div className="app__menu">
       <span className="app__menu--username">
        {props.user.firstname}
       </span>
        <span className="app__menu--avatar"></span>
        <Dropdown overlay={menuOptions} trigger={['click']}>
          <Icon type="more"/>
        </Dropdown>
    </div>
  )
}

export default connect(
  null,
  (dispatch, props) => {
    return {
      logout: () => dispatch(userActions.logoutUser(props.user._id))
    }
  }
)(AppMenu);