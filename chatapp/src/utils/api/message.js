import axios from '../axios';

export default {
  createMessage: (data) => {
    return axios.post('/message/create', data);
  },

  getMessages: (dialogId) => {
    return axios.get(`/messages/${dialogId}`)
  }
}