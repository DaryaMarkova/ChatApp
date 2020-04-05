import axios from 'axios';
import userActions from 'redux/actions/user';
import store from 'redux/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['token'] = token;
  }

  return config
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 403) {
    store.dispatch(userActions.unsetUser())
    localStorage.removeItem('token');
  }

  return Promise.reject(error);
});
export default axios;