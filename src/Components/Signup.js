import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

function Signup() {

  function doSignup(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      console.log('successfully signed in!');
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      <h1>Signup</h1>
      <form onSubmit={doSignup}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
      <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
    </React.Fragment>
  );
}

export default Signup;