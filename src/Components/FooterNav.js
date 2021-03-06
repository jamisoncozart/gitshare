import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

let FooterNav = props => {
  const iconPath = process.env.PUBLIC_URL + '/assets/';

  const handleClickingFeed = () => {
    const action = {
      type: 'CHANGE_CURRENT_VIEW',
      view: '/posts'
    }
    props.dispatch(action);
    props.handleNavToFeed()
  }

  const changeToCurrentUserProfile = () => {

    // update what is currently the local state of currentProfile in Profile.js with redux and update the currentProfile with redux here using dispatch

    const action = {
      type: 'SET_CURRENT_USER',
      name: props.currentLoggedUser.name,
      id: props.currentLoggedUser.id,
      currentUserProfile: true
    }
    const action2 = {
      type: 'CHANGE_CURRENT_VIEW',
      view: '/profile'
    }
    props.dispatch(action);
    props.dispatch(action2);
  }

  const handleNavToSaved = () => {
    const action = {
      type: 'CHANGE_CURRENT_VIEW',
      view: '/saved'
    }
    props.dispatch(action);
  }

  const handleNavToNewPost = () => {
    const action = {
      type: 'CHANGE_CURRENT_VIEW',
      view: '/newPost'
    }
    props.dispatch(action);
  }

  const handleNavToFollows = () => {
    const action = {
      type: 'CHANGE_CURRENT_VIEW',
      view: '/follows'
    }
    props.dispatch(action);
  }

  return (
    <div className={props.darkMode ? 'darkFooter' : 'footer'}>
      <Link 
        onClick={handleClickingFeed} 
        className={classNames({
          'navActive': props.currentView === '/posts' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': props.currentView === '/posts' && props.darkMode,
          'darkNavLink': props.darkMode 
        })} 
        to='/posts'>
          <img src={props.darkMode ? `${iconPath}Home_white.png` : `${iconPath}Home_black.png`} />
      </Link>
      <Link 
        onClick={handleNavToSaved} 
        className={classNames({
          'navActive': props.currentView === '/saved' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': props.currentView === '/saved' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}
        to='/saved'>
          <img src={props.darkMode ? `${iconPath}Save_white.png` : `${iconPath}Save_black.png`} />
      </Link>
      <Link 
        onClick={handleNavToNewPost} 
        className={classNames({
          'navActive': props.currentView === '/newPost' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': props.currentView === '/newPost' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}
        to='/newPost'>
          <img src={props.darkMode ? `${iconPath}New_white.png` : `${iconPath}New_Black.png`} />
      </Link>
      <Link 
        onClick={handleNavToFollows} 
        className={classNames({
          'navActive': props.currentView === '/follows' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': props.currentView === '/follows' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}  
        to='/follows'>
          <img src={props.darkMode ? `${iconPath}Following_white.png` : `${iconPath}Following_black.png`} />
      </Link>
      <Link 
        onClick={changeToCurrentUserProfile} 
        className={classNames({
          'navActive': props.currentView === '/profile' && !props.darkMode, 
          'navLink': !props.darkMode,
          'darkNavActive': props.currentView === '/profile' && props.darkMode,
          'darkNavLink': props.darkMode 
        })}  
        to='/profile'>
          <img src={props.darkMode ? `${iconPath}Profile_white.png` : `${iconPath}Profile_Black.png`} />
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentView: state.currentView,
    darkMode: state.darkMode
  }
}

FooterNav = connect(mapStateToProps)(FooterNav);

export default FooterNav;