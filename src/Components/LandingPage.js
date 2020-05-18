import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Logo from './Logo';

const LandingPage = props => {
  const history = useHistory();
  const auth = firebase.auth();

  function handleBackToApp() {
    if(auth.currentUser == null) {
      history.push('/signin');
    } else {
      history.push('/posts');
    }
  }

  return(
    <div className='landingPage'>
      <img className='logoImg' src='https://i.imgur.com/Lta1Npc.png' />
      <h1 className='logoText'>git share</h1>
      <p className='copyright'>&copy; 2020 - Jamison Cozart</p>
      <div className='link'>
        <a href='https://github.com/jamisoncozart/gitshare'>
          <img src='https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png' />
          <p>GitHub Repository</p>
        </a>
      </div>
      <button className='enterAppButton' onClick={handleBackToApp}>Enter</button>
    </div>
  );
}

export default LandingPage;