import axios from '../axios';

export default {
  createDialog: (data) => {
    return axios.post('/dialog/create', data);
  },
  getDialogs: () => {
    return axios.get('/dialogs')
  }
};