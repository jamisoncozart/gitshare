import React, { useState } from 'react';
import firebase from 'firebase/app';
import Logo from './Logo';
import { useHistory } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';

function Header(props) {
  const auth = firebase.auth();
  const history = useHistory();
  const [topActiveTheme, setTopActiveTheme] = useState(false);
  const [newActiveTheme, setNewActiveTheme] = useState(false);
  const [followActiveTheme, setFollowActiveTheme] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

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

  const handleTogglingSideButton = button => {
    if(button === 'top') {
      setTopActiveTheme(!topActiveTheme);
    } else if(button === 'new') {
      setNewActiveTheme(!newActiveTheme);
    } else if(button === 'follow') {
      setFollowActiveTheme(!followActiveTheme);
    }
    props.handlePressingSidebarButton(button);
  }



  return (
    <div className='header'>
      <Logo imageHeight='25px' fontSize='18px'/>
      <div className='headerRight'>
        <p className='displayName'>{currentUser}</p>
        <button 
          className={'sidebarButton'} 
          onClick={() => setNavOpen(true)}>
            <img src='https://www.contentformula.com/blog/wp-content/uploads/2016/06/hamburger-menu.png'/>
        </button>
      </div>
      <div className={navOpen ? 'sideNav openNav' : 'sideNav'}>
        <button 
          onClick={() => setNavOpen(false)} 
          className="closebtn">
            <img src='https://cdn.iconscout.com/icon/free/png-256/chevron-27-433515.png'/>
        </button>
        <button 
          onClick={() => handleTogglingSideButton('top')}
          className={topActiveTheme ? 'activeSideButton' : 'sideNavButton'}>
            <img src='https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42697-fire-icon.png'/>
            Top
        </button>
        <button 
          onClick={() => handleTogglingSideButton('new')}
          className={newActiveTheme ? 'activeSideButton' : 'sideNavButton'}>
            <img src='https://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52705-sparkles-icon.png'/>
            New
        </button>
        <button 
          onClick={() => handleTogglingSideButton('follow')}
          className={followActiveTheme ? 'activeSideButton' : 'sideNavButton'}>
            <img src='https://tribemobile.co/wp-content/uploads/2016/06/connect-icon.png'/>
            Follows
        </button>
        <button 
          onClick={() => setDarkTheme(!darkTheme)}
          className={darkTheme ? 'darkActiveSideButton' : 'sideNavButton'}>
            <img src={darkTheme ? 'https://i2.wp.com/hostasonthebluff.com/wp-content/uploads/2017/10/Sun-Icon.png?fit=256%2C256&ssl=1' : 'https://cdn.iconscout.com/icon/free/png-256/half-moon-1767806-1502386.png'}/>
            Theme
        </button>
        <button 
          className='sideNavButton' 
          onClick={doSignOut}>
            <img src='https://www.shareicon.net/data/256x256/2016/05/30/772895_multimedia_512x512.png'/>
            Logout
        </button>
      </div>
      <div onClick={() => setNavOpen(false)} className={navOpen ? 'darknessStyle' : 'nothing'}></div>
    </div>
  );
}

export default Header;