import React, { useEffect, useState } from 'react';
import { Auth, Home }  from './pages';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppMenu } from './components';
import { userActions } from 'redux/actions';
import { withSocket } from 'containers/with.socket';
import './App.css';

const App = (props) => {
  const token = localStorage.getItem('token');
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    setAuthorized(!props.isExpired && token);    
    if (!props.user) {
      props.getUser();
    } 
  }, [props, token]);

  return (   
      <div className="app">
        <div className="app__header">
          {
            isAuthorized && <AppMenu user={props.user}/>
          }
        </div> 
        {
          isAuthorized ? <Redirect to='/im' /> : <Redirect to='/login' />
        }
        {
           isAuthorized ? <Home /> : <Auth />
        } 
      </div>
  );
}

export default connect(
  ({user}) => {
    return {
      user: user.user,
      isExpired: user.isExpired
    }
  },
  (dispatch) => {
    return {
      getUser: () => dispatch(userActions.getUser())
    }
  }
)(withSocket(App));
