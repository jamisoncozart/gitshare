import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Logo from './Logo';

function Signin(props) {

  const history = useHistory();

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
      props.handleSignIn(true);
      history.push('/');
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return (
    <div className='signin'>
      <Logo imageHeight='50px' fontSize='30px'/>
      <form className='signinForm' onSubmit={doSignIn}>
        <h2>Sign In</h2>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button className="submitButton" type='submit'>Submit</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Signin;