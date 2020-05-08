import userSignInReducer from './user-sign-in-reducer';
import currentUserReducer from './current-user-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userSignedIn: userSignInReducer,
  currentUser: currentUserReducer
});

export default rootReducer;