import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Particles from 'react-particles-js';

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

  const particleStyles = {
    zIndex: '1'
  }

  const particleParams = {
    "particles": {
      "number": {
        "value": 160,
        "density": {
          "enable": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "speed": 4,
          "size_min": 0.3
        }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
        "random": true,
        "speed": 3,
        "direction": "top-right",
        "out_mode": "out"
      },
      "color": {
        "value": "#222"
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        }
      },
      "modes": {
        "bubble": {
          "distance": 250,
          "duration": 2,
          "size": 0,
          "opacity": 0
        },
        "repulse": {
          "distance": 400,
          "duration": 4
        }
      }
    }
  }

  return(
    <React.Fragment>
      <Particles params={particleParams} style={particleStyles} height='99.3vh' width='100vw'/>
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
    </React.Fragment>
  );
}

export default LandingPage;