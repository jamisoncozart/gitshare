import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

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
    <React.Fragment>
      <h1>Signin</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <Link to='/'>Back to Home!</Link>
    </React.Fragment>
  );
}

export default Signin;