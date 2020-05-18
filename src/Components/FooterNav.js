import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

function FooterNav(props) {
  const iconPath = process.env.PUBLIC_URL + '/assets/';
  const location = useLocation();
  const [currentView, setCurrentView] = useState(`${location.pathname}`);

  const handleClickingFeed = () => {
    setCurrentView('/posts');
    props.handleNavToFeed()
  }

  const changeToCurrentUserProfile = () => {
    props.handleNavToProfile(true);
    setCurrentView('/profile')
  }

  return (
    <div className={props.darkMode ? 'darkFooter' : 'footer'}>
      <Link 
        onClick={handleClickingFeed} 
        className={classNames({
          'navActive': currentView === '/posts' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': currentView === '/posts' && props.darkMode,
          'darkNavLink': props.darkMode 
        })} 
        to='/posts'>
          <img src={props.darkMode ? `${iconPath}Home_white.png` : `${iconPath}Home_black.png`} />
      </Link>
      <Link 
        onClick={() => setCurrentView('/saved')} 
        className={classNames({
          'navActive': currentView === '/saved' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': currentView === '/saved' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}
        to='/saved'>
          <img src={props.darkMode ? `${iconPath}Save_white.png` : `${iconPath}Save_black.png`} />
      </Link>
      <Link 
        onClick={() => setCurrentView('/newPost')} 
        className={classNames({
          'navActive': currentView === '/newPost' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': currentView === '/newPost' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}
        to='/newPost'>
          <img src={props.darkMode ? `${iconPath}New_white.png` : `${iconPath}New_black.png`} />
      </Link>
      <Link 
        onClick={() => setCurrentView('/follows')} 
        className={classNames({
          'navActive': currentView === '/follows' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': currentView === '/follows' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}  
        to='/follows'>
          <img src={props.darkMode ? `${iconPath}Following_white.png` : `${iconPath}Following_black.png`} />
      </Link>
      <Link 
        onClick={changeToCurrentUserProfile} 
        className={classNames({
          'navActive': currentView === '/profile' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': currentView === '/profile' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}  
        to='/profile'>
          <img src={props.darkMode ? `${iconPath}Profile_white.png` : `${iconPath}Profile_black.png`} />
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

FooterNav = connect(mapStateToProps)(FooterNav);

export default FooterNav;