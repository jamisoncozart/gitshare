import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function FooterNav(props) {

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
    <div className='footer'>
      <Link 
        onClick={handleClickingFeed} 
        className={classNames({
          'navActive': currentView === '/posts', 
          'navLink': true
        })} 
        to='/posts'>
          <img src='https://jamisoncozart.github.io/mobile-portfolio/img/home.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('/saved')} 
        className={classNames({
          'navActive': currentView === '/saved', 
          'navLink': true
        })}
        to='/saved'>
          <img src='https://www.shareicon.net/data/256x256/2016/09/10/828155_save_487x512.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('/newPost')} 
        className={classNames({
          'navActive': currentView === '/newPost', 
          'navLink': true
        })}
        to='/newPost'>
          <img src='https://img.icons8.com/pastel-glyph/2x/plus.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('/follows')} 
        className={classNames({
          'navActive': currentView === '/follows', 
          'navLink': true
        })}  
        to='/follows'>
          <img src='https://tribemobile.co/wp-content/uploads/2016/06/connect-icon.png' />
      </Link>
      <Link 
        onClick={changeToCurrentUserProfile} 
        className={classNames({
          'navActive': currentView === '/profile', 
          'navLink': true
        })}  
        to='/profile'>
          <img src='https://jamisoncozart.github.io/mobile-portfolio/img/user.png' />
      </Link>
    </div>
  );
}

export default FooterNav;