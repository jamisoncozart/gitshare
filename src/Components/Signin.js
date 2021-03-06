import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Logo from './Logo';

function Signin(props) {
  const auth = firebase.auth();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
      props.handleSignIn(true);
      history.push('/posts');
    }).catch(function(error) {
      setErrorMessage(error.message);
    });
  }

  const copyright = {
    margin: '20px'
  }

  function handleRedirectToPosts() {
    if(auth.currentUser != null) {
      props.setOnSignIn(false);
      history.push('/posts');
      const action = {
        type: 'CHANGE_CURRENT_VIEW',
        view: '/posts'
      }
      props.dispatch(action);
    }
    return null
  }

  return (
    <div className='signin'>
      <Logo imageHeight='50px' fontSize='30px'/>
      <form className='signinForm' onSubmit={doSignIn}>
        <h2>Sign In</h2>
        <input
          type='text'
          name='signinEmail'
          placeholder='email'
          // value='admin@admin.com'
          required />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password'
          // value='password'
          required />
        <p className='errorMessage'>{errorMessage}</p>
        <button 
          className="submitButton" 
          type='submit'>
            Submit
        </button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
      <p style={copyright} className='copyright'>&copy; 2020 - Jamison Cozart</p>
    </div>
  );
}

export default Signin;