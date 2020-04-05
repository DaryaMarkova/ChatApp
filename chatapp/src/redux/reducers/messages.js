import { createActions, handleActions } from 'redux-actions';

const initialState = {
  messages: []
};

export const {
  appendMessages,
  removeMessage
} = createActions({
  APPEND_MESSAGES: (messages) => ({ messages }),
  REMOVE_MESSAGE: (messageId) => ({ messageId })
});
export default handleActions({
  [appendMessages]: (state, { payload: { messages } } ) => {
    if (Array.isArray(messages)) {
      return {
        ...state, 
        messages: [
          ...messages
        ]
      }
    }

    return {
      ...state, 
      messages: [
        ...state.messages,
        messages
      ]
    }
  },
  [removeMessage]: (state, { payload: { messageId } }) => {
    return {
      ...state,
      messages: state.messages.filter(it => it._id !== messageId)
    }
  }
}, initialState);