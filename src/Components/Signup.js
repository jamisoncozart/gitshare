import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Logo from './Logo';
import { useFirestore } from 'react-redux-firebase';

function Signup() {

  const [errorMessage, setErrorMessage] = useState('');
  const auth = firebase.auth();
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
      auth.createUserWithEmailAndPassword(email, password).then(function() {
        console.log('successfully signed in!');
        auth.currentUser.updateProfile({
          displayName: username
        }).then(function() {
          profiles.add(
            {
              displayName: username,
              email: email,
              profilePic: null,
              following: [],
              creationTime: db.FieldValue.serverTimestamp()
            }
          )
          .then(function(docRef) {
            auth.currentUser.updateProfile({
              photoURL: docRef.id
            });
          }).catch(function(error) {
            setErrorMessage(error.message);
          });
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

  const copyright = {
    margin: '20px'
  }

  return (
    <div className="signin">
      <Logo imageHeight='50px' fontSize='30px'/>
      <form className="signinForm" onSubmit={doSignup}>
        <h2>Signup</h2>
        <input
          type='text'
          name='username'
          placeholder='username'
          required />
        <input
          type='text'
          name='email'
          placeholder='email'
          required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required />
        <p className='errorMessage'>{errorMessage}</p>
        <button 
          className="submitButton" 
          type='submit'>
            Submit
        </button>
        <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
      </form>
      <p style={copyright} className='copyright'>&copy; 2020 - Jamison Cozart</p>
    </div>
  );
}

export default Signup;