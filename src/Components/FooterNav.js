import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function FooterNav() {

  const location = useLocation();
  const [currentView, setCurrentView] = useState(`${location.pathname}`);

  return (
    <div className='footer'>
      <Link 
        onClick={() => setCurrentView('/posts')} 
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
          <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/9127722121551940361-256.png' />
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
          <img src='https://lh3.googleusercontent.com/proxy/ESh0zeV6iIHM7pcWVml18xDgcOF6fawMuoEt-mX3fQEta71f99ImzLNsq0RO98j33GGBKIA-aGAca7_j7JBxInSWg80vrOq1EZK9h8M5moVT5Sg6o9DnJRh24scLkw' />
      </Link>
      <Link 
        onClick={() => setCurrentView('/profile')} 
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