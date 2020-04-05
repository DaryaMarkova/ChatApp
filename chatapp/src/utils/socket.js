import openSocket from 'socket.io-client';
import { socketEvents } from 'utils/events';

const socket = openSocket(process.env.REACT_APP_API_URL);

socket.unsubscribeEvents = (userId) => {
  Object.getOwnPropertyNames(socketEvents).forEach(event => {
    socket.off(socketEvents[event].call(null, userId))    
  })
}

export default socket;