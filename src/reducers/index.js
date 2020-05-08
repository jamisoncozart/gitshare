import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userSignedIn: false,
  currentUser: null
});

export default rootReducer;