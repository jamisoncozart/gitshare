import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

const LandingPage = props => {
  const history = useHistory();
  const auth = firebase.auth();

  function handleBackToApp() {
    if(auth.currentUser == null) {
      history.push('/signin');
    } else {
      history.push('/posts');
    }
  }

  return(
    <div>
      <h2>Landing Page</h2>
      <a onClick={handleBackToApp}>Back To App</a>
    </div>
  );
}

export default LandingPage;