import axios from '../axios';

export default {
  createRoom: (data) => {
    return axios.post('/room/create', data);
  },
  getRooms: () => {
    return axios.get('/rooms')
  }
};