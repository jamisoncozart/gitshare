import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

function Signup() {
  const history = useHistory();
  function doSignup(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      console.log('successfully signed in!');
      firebase.auth().currentUser.updateProfile({
        displayName: username
      }).then(function() {
        console.log('successfully updated displayName');
        history.push('/signin');
      }, function(error) {
        console.log(error.message);
      });
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
          name='username'
          placeholder='username' />
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