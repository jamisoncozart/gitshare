import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useFirestore, isLoaded } from 'react-redux-firebase';

const Profile = props => {
  const auth = firebase.auth();
  const db = useFirestore();
  const [currentProfile, setCurrentProfile] = useState(null);
  if((isLoaded(auth)) && (auth.currentUser != null)) {
    const currentUserProfile = db.collection('profiles').doc(auth.currentUser.photoURL);
    currentUserProfile.get().then(function(profile) {
      setCurrentProfile(profile.data());
    }).catch(function(error) {
      console.log(error.message);
    });
  } else {
    return <h3>Loading...</h3>
  }
  return (
    <div className='profile'>

    {currentProfile != null ? 
      <div className='profileHeader'>
        <h2>{currentProfile.displayName}</h2>
        <h3>{currentProfile.email}</h3>
      </div> :
      <h3>Loading...</h3>
    }
    </div>
  )
}

export default Profile;