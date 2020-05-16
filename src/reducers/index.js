import userSignInReducer from './user-sign-in-reducer';
import currentUserReducer from './current-user-reducer';
import currentPostReducer from './current-post-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  userSignedIn: userSignInReducer,
  currentUser: currentUserReducer,
  currentPost: currentPostReducer,
  firestore: firestoreReducer
});

export default rootReducer;