import React, { useState } from 'react';
import firebase from 'firebase/app';
import Logo from './Logo';
import SideBar from './SideBar';
import { useHistory } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

function Header(props) {
  const auth = firebase.auth();
  const history = useHistory();
  const [topActiveTheme, setTopActiveTheme] = useState(false);
  const [newActiveTheme, setNewActiveTheme] = useState(false);
  const [followActiveTheme, setFollowActiveTheme] = useState(false);
  const iconPath = process.env.PUBLIC_URL + '/assets/';

  if(props.darkMode) {
    document.body.style.backgroundColor = '#000';
  } else {
    document.body.style.backgroundColor = '#eee';
  }

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
    <div className={props.darkMode ? 'darkHeader' : 'header'}>
      <Logo darkMode={props.darkMode} imageHeight='25px' fontSize='18px'/>
      <div className='headerRight'>
        <p className={props.darkMode ? 'darkDisplayName' : 'displayName'}>{currentUser}</p>
        <button 
          className={props.darkMode ? 'darkSideBarButton' : 'sidebarButton'} 
          onClick={() => setNavOpen(true)}>
            <img src={props.darkMode ? `${iconPath}hamburger_white.png` : `${iconPath}hamburger_black.png`}/>
        </button>
      </div>
      <SideBar 
        handleTogglingSideButton={handleTogglingSideButton} 
        darkMode={props.darkMode}
        setNavOpen={setNavOpen}
        navOpen={navOpen}
        topActiveTheme={topActiveTheme}
        newActiveTheme={newActiveTheme}
        followActiveTheme={followActiveTheme}
        doSignOut={doSignOut}
        dispatch={props.dispatch} />
      <div onClick={() => setNavOpen(false)} className={navOpen ? 'darknessStyle' : 'nothing'}></div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

Header = connect(mapStateToProps)(Header);

export default Header;