import userSignInReducer from './user-sign-in-reducer';
import currentUserReducer from './current-user-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  userSignedIn: userSignInReducer,
  currentUser: currentUserReducer,
  firestore: firestoreReducer
});

export default rootReducer;