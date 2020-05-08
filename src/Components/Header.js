import React from 'react';
import firebase from 'firebase/app';
import Logo from './Logo';

function Header(props) {

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
      props.handleSignOut(false);
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return (
    <div className='header'>
      <Logo imageHeight='25px' fontSize='18px'/>
      <button className='signOutButton' onClick={doSignOut}>Sign out</button>
    </div>
  );
}

export default Header;