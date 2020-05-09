import React from 'react';
import firebase from 'firebase/app';
import Logo from './Logo';
import { useHistory } from 'react-router-dom';

function Header(props) {

  const history = useHistory();

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      history.push('/signin');
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