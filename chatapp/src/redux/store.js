import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';

// export default applyMiddleware(thunk)(createStore(appReducer));
export default compose(applyMiddleware(thunk))(createStore)(appReducer)