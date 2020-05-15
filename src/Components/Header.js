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
        <button 
          onClick={() => props.handlePressingSidebarButton('top')}
          className='sideNavButton'>
            <img src='https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42697-fire-icon.png'/>
            Top
        </button>
        <button 
          onClick={() => props.handlePressingSidebarButton('new')}
          className='sideNavButton'>
            <img src='https://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52705-sparkles-icon.png'/>
            New
        </button>
        <button 
          onClick={() => props.handlePressingSidebarButton('follow')}
          className='sideNavButton'>
            <img src='https://tribemobile.co/wp-content/uploads/2016/06/connect-icon.png'/>
            Follows
        </button>
        <button 
          className='sideNavButton' 
          onClick={doSignOut}>
            <img src='https://www.shareicon.net/data/256x256/2016/05/30/772895_multimedia_512x512.png'/>
            Logout
        </button>
      </div>
      <div className={navOpen ? 'darknessStyle' : 'nothing'}></div>
    </div>
  );
}

export default Header;