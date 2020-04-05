import { createActions, handleActions } from 'redux-actions';

const initialState = {
  dialogs: []
};

export const {
  addDialogs,
  updateDialog,
  selectDialog,
  updateDialogMessage,
  searchDialogs
} = createActions({
  ADD_DIALOGS: dialogs => ({dialogs}),
  UPDATE_DIALOG: dialog => ({dialog}),
  SELECT_DIALOG: dialogId => ({dialogId}),
  UPDATE_DIALOG_MESSAGE: message => ({message}),
  SEARCH_DIALOGS: (data) => ({data})
})

export default handleActions({
  [addDialogs]: (state, { payload: { dialogs }} ) => {
    if (Array.isArray(dialogs)) {
      return {
        ...state,
        dialogs: [
          ...dialogs.map(it => it.lastMessage ? it : Object.assign(it, { lastMessage: { text: '' }}))
        ]
      }
    }

    if (!dialogs.lastMessage) {
      dialogs.lastMessage = {
        text: ''
      }
    }

    return {
      ...state,
      dialogs: [
        dialogs,
        ...state.dialogs
      ]
    }
  },
  [updateDialog]: (state, { payload: { dialog }} ) => {
    const index = state.dialogs.findIndex(it => it._id === dialog._id);
    const before = state.dialogs.slice(0, index); 
    const after = state.dialogs.slice(index + 1);
    const _dialog = state.dialogs[index];

    return {
      ...state,
      dialogs: 
        dialog.lastMessage._id === _dialog.lastMessage._id ? 
        [...before, dialog, ...after] : 
        [dialog, ...before, ...after]
    }
  },
  [selectDialog]: (state, { payload: { dialogId }}) => {
    const index = state.dialogs.findIndex(it => it._id === dialogId);
    const selectedDialog = {...state.dialogs[index], unread: 0}

    return {
      ...state,
      selectedId: dialogId,
      activeDialog: selectedDialog,
      dialogs: [...state.dialogs.slice(0, index), selectedDialog, ...state.dialogs.slice(index + 1)]
    }
  },
  [updateDialogMessage]: (state, { payload: { message }}) => {
    const index = state.dialogs.findIndex(it => it._id === message.dialog._id);
    const newDialog = {...state.dialogs[index], lastMessage: message};

    return {
      ...state,
      dialogs: [newDialog, ...state.dialogs.slice(0, index), ...state.dialogs.slice(index + 1)]
    }
  },
  [searchDialogs]: (state, { payload: { data }}) => {
    const { pattern, user } = data;
    const sourceDialogs = state.sourceDialogs || state.dialogs;

    return {
      ...state,
      sourceDialogs: sourceDialogs,
      dialogs: sourceDialogs.filter(dialog => {
        const comparedUser = dialog.partner._id === user._id ? dialog.author : dialog.partner;
        return comparedUser.firstname.toLowerCase().includes(pattern) || 
          comparedUser.lastname.toLowerCase().includes(pattern);
      })
    }
  }
}, initialState);