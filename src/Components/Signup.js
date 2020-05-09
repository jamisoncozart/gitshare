import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Logo from './Logo';
import { useFirestore } from 'react-redux-firebase';

function Signup() {

  const [errorMessage, setErrorMessage] = useState('');

  const db = useFirestore();
  const history = useHistory();
  async function doSignup(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;
    //check is username is already taken
    const profiles = db.collection('profiles');
    let sameProfileName = 0;
    await db.collection('profiles').where('displayName', '==', username)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(profile => {
          sameProfileName++;
        })
      })
      .catch(function(error) {
        console.log('error: ' + error.message);
      });
    if(sameProfileName === 0) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        console.log('successfully signed in!');
        firebase.auth().currentUser.updateProfile({
          displayName: username
        }).then(function() {
          profiles.add(
            {
              displayName: username,
              email: email,
              creationTime: db.FieldValue.serverTimestamp()
            }
          );
          history.push('/signin');
        }, function(error) {
          setErrorMessage(error.message);
        });
      }).catch(function(error) {
        setErrorMessage(error.message);
      });
    } else {
      setErrorMessage('that username is already taken');
    }
  }

  return (
    <div className="signin">
      <Logo imageHeight='50px' fontSize='30px'/>
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
        <p className='errorMessage'>{errorMessage}</p>
        <button className="submitButton" type='submit'>Submit</button>
        <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
      </form>
    </div>
  );
}

export default Signup;