import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FooterNav() {

  const [currentView, setCurrentView] = useState('Feed');

  return (
    <div className='footer'>
      <Link 
        onClick={() => setCurrentView('Feed')} 
        className={currentView === 'Feed' ? 'navActive' : ''} 
        to='/posts'>
          <img src='https://jamisoncozart.github.io/mobile-portfolio/img/home.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('Saved')} 
        className={currentView === 'Saved' ? 'navActive' : ''} 
        to='/posts'>
          <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/9127722121551940361-256.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('New')} 
        className={currentView === 'New' ? 'navActive' : ''} 
        to='/newPost'>
          <img src='https://img.icons8.com/pastel-glyph/2x/plus.png' />
      </Link>
      <Link 
        onClick={() => setCurrentView('Follows')} 
        className={currentView === 'Follows' ? 'navActive' : ''} 
        to='/follows'>
          <img src='https://lh3.googleusercontent.com/proxy/ESh0zeV6iIHM7pcWVml18xDgcOF6fawMuoEt-mX3fQEta71f99ImzLNsq0RO98j33GGBKIA-aGAca7_j7JBxInSWg80vrOq1EZK9h8M5moVT5Sg6o9DnJRh24scLkw' />
      </Link>
      <Link 
        onClick={() => setCurrentView('Profile')} 
        className={currentView === 'Profile' ? 'navActive' : ''} 
        to='/profile'>
          <img src='https://jamisoncozart.github.io/mobile-portfolio/img/user.png' />
      </Link>
    </div>
  );
}

export default FooterNav;