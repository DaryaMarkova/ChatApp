import React, { Component } from 'react';
import socketClient from 'utils/socket';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { 
  dialogActions, 
  messageActions, 
  roomActions, 
  userActions } from 'redux/actions';
import { socketEvents } from 'utils/events';
import store from 'redux/store';


notification.config({
  placement: 'bottomRight'
})

export const withSocket = (WrappedComponent) => {
  const component = class extends Component {
    state = {
      user: null
    }

    componentDidUpdate() {
      if (!this.props.user) {
        return;
      }
      
      const userId = this.props.user._id;
			socketClient.unsubscribeEvents(userId); //unsubscribing from old ones
			
      socketClient.on(socketEvents.loggedOut(userId), () => this.onUserLoggedOut());
      socketClient.on(socketEvents.newRoomMessage(userId), message => this.onNewRoomMessage(message, userId));
      socketClient.on(socketEvents.newDialogMessage(userId), message => this.onNewDialogMessage(message));
			socketClient.on(socketEvents.newMessageStartTyping(), (data) => {
				if (data.dialog && userId !== data.user._id) {
          this.onDialogMessageStartTyping(data);
				} else if (data.room && userId !== data.user._id) {
          this.onRoomMessageStartTyping(data);
        }
      });
			socketClient.on(socketEvents.newMessageStopTyping(), (data) => {
				if (data.dialog && userId !== data.user._id) {
          this.onDialogMessageStopTyping(data);
        } else if (data.room && userId !== data.user._id) {
          this.onRoomMessageStopTyping(data);
        }
			});
		}

    componentWillUnmount() {
      socketClient.unsubscribeEvents(this.props.user._id);
    }

    onUserLoggedOut() {
      store.dispatch(userActions.unsetUser());
      localStorage.removeItem('token');
    }

    onNewDialogMessage(message) {
      const { dialogs, selectedId }  = store.getState().dialog;
      const parent = dialogs.find(it => it._id === message.dialog._id);
      const dialog = {
        ...message.dialog,
        lastMessage: {
          text: message.text,
          createdAt: message.createdAt
        }
      }

      const isMessageMine = message.user._id === this.props.user._id;
      const notify = () => {
        notification.open({
          message: `Новое сообщение от ${message.user.firstname} ${message.user.lastname}`,
          description: message.text
        });
      };

      if (!parent) {
        store.dispatch(dialogActions.addDialogs(dialog));
        if (!isMessageMine) {
          notify();
        }
        return;
      } 

      const isActive = selectedId && selectedId === message.dialog._id;

      if (isActive) {
        store.dispatch(messageActions.removeMessage(message.user._id));
        store.dispatch(messageActions.addMessages(message));
      } else if (!isMessageMine) {
        notify();
      }

      store.dispatch(dialogActions.updateDialog({
        ...dialog,
        unread: !isMessageMine && !isActive ? (parent.unread || 0) + 1: parent.unread
      }));
    }

    onNewRoomMessage(message, userId) {
      const rooms = store.getState().room.rooms;
      const activeRoom = store.getState().room.activeRoom;
      const parent = rooms.find(it => it._id === message.room._id);
      const isMessageMine = message.user._id === userId;

      if (!isMessageMine) {
        notification.open({
          message: `${message.room.title}`,
          description: `Новое сообщение от ${message.user.firstname} ${message.user.lastname}`
        });
      }

      if (!parent) {
        store.dispatch(roomActions.appendRooms(message.room));
        return;
      }

      if (!activeRoom) {
        store.dispatch(roomActions.updateRoom(message.room));
        return;
      } 

      store.dispatch(roomActions.removeMessage(message.user._id));
      store.dispatch(roomActions.appendMessage(message));
    }

    onDialogMessageStartTyping(data) {
      const dialog = store.getState().dialog.dialogs.find(it => it._id === data.dialog);

      if (dialog) {
        const fakeMessage = {
          _id: data.user._id, 
          user: data.user, 
          createdAt: new Date().toISOString(), 
          typed: true
        };

        if (dialog._id === store.getState().dialog.selectedId) {
          store.dispatch(messageActions.addMessages(fakeMessage));
        }

        store.dispatch(dialogActions.updateDialog({...dialog, typed:  true}));
      }
    }

    onDialogMessageStopTyping(data) {
      const dialog = store.getState().dialog.dialogs.find(it => it._id === data.dialog);
      
      if (dialog) {
        store.dispatch(dialogActions.updateDialog({...dialog, typed:  false}));
        store.dispatch(messageActions.removeMessage(data.user._id));
      }
    }

    onRoomMessageStartTyping(data) {
      const room = store.getState().room.rooms.find(it => it._id === data.room);
      const activeRoom =  store.getState().room.activeRoom;

      if (room) {
        const fakeMessage = {
          _id: data.user._id, 
          user: data.user, 
          createdAt: new Date().toISOString(), 
          typed: true
        };

        if (activeRoom && room._id === activeRoom._id) {
          store.dispatch(roomActions.appendMessage(fakeMessage));
        }

        store.dispatch(roomActions.updateRoom({...room, typed:  true}));
      }
    }

    onRoomMessageStopTyping(data) {
      const room = store.getState().room.rooms.find(it => it._id === data.room);

      if (room) {
        store.dispatch(roomActions.updateRoom({...room, typed:  false}));
        store.dispatch(roomActions.removeMessage(data.user._id));
      }
    }

    render() {
      return <WrappedComponent {...this.props} loggedOut={this.state.isUserLoggedOut} />
    }
  }

  return connect(({user}) => user, null)(component);
}