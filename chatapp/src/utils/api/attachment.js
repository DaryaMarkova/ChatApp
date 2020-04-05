import axios from '../axios';

export default {
  sendFile: (data) => {
    return axios.post('/attachment/uploadfile', data, { 
      headers: { 'Content-Type': 'multipart/form-data' } 
    });
	},
	sendFiles: (data) => {
		return axios.post('/attachment/uploadfiles', data, { 
      headers: { 'Content-Type': 'multipart/form-data' } 
    });
	},
  getFile: (resourceId, mimetype) => {
    return axios.get(`/attachment/${resourceId}`, {
      responseType: 'blob',
      headers: {
        'Accept': mimetype
      }
    })
  },
  getFilePreview: (resourceId, mimetype) => {
    return axios.get(`/attachment/small_preview/${resourceId}`, {
      responseType: 'blob',
      headers: {
        'Accept': mimetype
      }
    });
  }
};