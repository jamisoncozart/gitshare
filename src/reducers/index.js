import currentUserReducer from './current-user-reducer';
import currentPostReducer from './current-post-reducer';
import darkModeReducer from './dark-mode-reducer';
import currentViewReducer from './current-view-reducer';
import viewingDetailsReducer from './viewing-details-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentPost: currentPostReducer,
  currentView: currentViewReducer,
  viewingDetails: viewingDetailsReducer,
  darkMode: darkModeReducer,
  firestore: firestoreReducer
});

export default rootReducer;