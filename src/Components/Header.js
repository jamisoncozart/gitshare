import React, { useState } from 'react';
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

  const [navOpen, setNavOpen] = useState(false);
  const openNav = () => {
    setNavOpen(true);
    // document.getElementsByClassName('sideNav')[0].style.width = '100px';
    // document.body.style.opacity = '0.6';
  }
  const closeNav = () => {
    setNavOpen(false);
    // document.getElementsByClassName('sideNav')[0].style.width = '0';
    // document.body.style.opacity = '1';
  }

  return (
    <div className='header'>
      <Logo imageHeight='25px' fontSize='18px'/>
      <div className='headerRight'>
        <p className='displayName'>{currentUser}</p>
        <button 
          className='sidebarButton' 
          onClick={() => setNavOpen(true)}>
            <img src='https://www.contentformula.com/blog/wp-content/uploads/2016/06/hamburger-menu.png'/>
        </button>
      </div>
      <div className={navOpen ? 'sideNav openNav' : 'sideNav'}>
        <button 
          onClick={() => setNavOpen(false)} 
          className="closebtn">
            <img src='https://cdn.iconscout.com/icon/free/png-256/chevron-25-433513.png'/>
        </button>
        <a href="#">Top</a>
        <a href="#">New</a>
        <a href="#">Follows</a>
        <button className='signOutButton' onClick={doSignOut}>Sign out</button>
      </div>
      <div className={navOpen ? 'darknessStyle' : ''}></div>
    </div>
  );
}

export default Header;