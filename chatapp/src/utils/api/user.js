import axios from './../axios';

export default {
  login: (data) => {
    const { login, password, username } = data;

    return axios.post('/user/login', {
      username: login ? login : username,
      password: password
    })
  },
  get: () => {
    return axios.get('/user');
  },
  search: (pattern) => {
    return axios.get(`/users/search?pattern=${pattern}`)
  },
  logout: () => {
    return axios.post('/user/logout')
  },
  register: (data) => {
    return axios.post('/user/register', data)
  }
};