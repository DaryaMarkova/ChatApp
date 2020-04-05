import { createActions, handleActions } from 'redux-actions';

const initialState = {
  user: null,
  isExpired: false
};

export const {
  setUserData,
  clearUserData,
  registerUserFailure,
  registerUserSuccess
} = createActions({
  SET_USER_DATA: (user) => ({ user }),
  CLEAR_USER_DATA: () => ({}),
  REGISTER_USER_FAILURE: (errors) => ({errors}),
  REGISTER_USER_SUCCESS: {}
});

export default handleActions({
  [setUserData]: (state, { payload: { user }}) => {
    return {
      ...state,
      user: {...state.user, ...user},
      isExpired: false
    }
  },
  [clearUserData]: (state) => {
    return {
      ...state,
      user: null,
      isExpired: true
    }
  },
  [registerUserFailure]: (state, { payload: { errors }}) => {
    if (!errors.errors) {
      return state;
    }

    const validationErrors = (Object.keys(errors.errors) || []).reduce((obj, it) => {
      return {
        ...obj,
        [it]: errors.errors[it].message
      }
    }, {});

    return {
      ...state,
      errors: validationErrors
    }
  },
  [registerUserSuccess]: (state) => {
    return {
      ...state,
      errors: null
    }
  }
}, initialState);