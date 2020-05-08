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
    <div className="signin">
      <h1>git share</h1>
      <form className="signinForm" onSubmit={doSignup}>
        <h2>Signup</h2>
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
        <button className="submitButton" type='submit'>Submit</button>
        <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
      </form>
    </div>
  );
}

export default Signup;