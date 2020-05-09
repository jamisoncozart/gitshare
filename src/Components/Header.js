import React from 'react';
import firebase from 'firebase/app';
import Logo from './Logo';
import { useHistory } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';

function Header(props) {
  const auth = firebase.auth();
  const history = useHistory();

  function doSignOut() {
    auth.signOut().then(function() {
      history.push('/signin');
      props.handleSignOut(false);
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  let currentUser = '';
  if(((isLoaded(auth)) && (auth.currentUser != null))) {
    currentUser = auth.currentUser.displayName;
  }

  return (
    <div className='header'>
      <Logo imageHeight='25px' fontSize='18px'/>
      <div className='headerRight'>
        <p className='displayName'>{currentUser}</p>
        <button className='signOutButton' onClick={doSignOut}>Sign out</button>
      </div>
    </div>
  );
}

export default Header;