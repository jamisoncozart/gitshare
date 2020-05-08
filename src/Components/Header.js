import React from 'react';
import firebase from 'firebase/app';

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
      <h1>Header</h1>
      <button onClick={doSignOut}>Sign out</button>
    </div>
  );
}

export default Header;