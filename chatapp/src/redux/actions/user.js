import userApi from 'utils/api/user';
import socketClient from 'utils/socket';

import {
  setUserData,
  clearUserData,
  registerUserFailure,
  registerUserSuccess
} from 'redux/reducers/user';

const Actions = {
  setUser: user => dispatch => dispatch(setUserData(user)),
  unsetUser: () => dispatch => dispatch(clearUserData()),
  loginUser: (data) => dispatch => {
    return userApi.login(data).then(({data}) => {
      localStorage.setItem('token', data.token)
      dispatch(Actions.setUser(data))
    })
  },
  registerUser: (data) => dispatch => {
    const password = data.password;

    return userApi.register(data).then(({data}) => {
      const user = {...data, password};
      dispatch(Actions.loginUser(user));
      dispatch(registerUserSuccess())
    }).catch(err => {
      if (err.response && err.response.data)
        dispatch(registerUserFailure(err.response.data));
    })
  },
  logoutUser: (userId) => dispatch => {
    return userApi.logout().then(() => {
      socketClient.unsubscribeEvents(userId);
      localStorage.removeItem('token');
      dispatch(Actions.unsetUser());
    });
  },
  getUser: () => dispatch => {
    if (!localStorage.getItem('token')) {
      return dispatch(Actions.unsetUser());
    }

    return userApi.get().then(({data}) => {
      dispatch(Actions.setUser(data))
    })
  }
};

export default Actions;