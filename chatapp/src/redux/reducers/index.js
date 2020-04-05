import { combineReducers } from 'redux';

const reducers = ['dialog', 'messages', 'user', 'room'];
export default combineReducers(
  reducers.reduce((initial, name) => {
    initial[name] = require(`./${name}`).default;
    return initial
  }, {})
);