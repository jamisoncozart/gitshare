import React from 'react';
import firebase from 'firebase/app';
import { useFirestore, isLoaded } from 'react-redux-firebase';

const Profile = props => {
  const auth = firebase.auth();
  const db = useFirestore();
  let currentUserProfile;
  let profileData = null;
  if((isLoaded(auth)) && (auth.currentUser != null)) {
    currentUserProfile = db.collection('profiles').doc(auth.currentUser.photoURL);
    currentUserProfile.get().then(function(profile) {
      if(profile.exists) {
        profileData = profile.data();
      } else {
        console.log('Profile does not exist!');
      }
    }).catch(function(error) {
      console.log(error.message);
    })
  } else {
    console.log('Please sign in!');
  }
  console.log(profileData);
  return (
    <React.Fragment>
      {profileData ? (
        <div className='profile'>
          <h2>{profileData.displayName}</h2>
          <h4>{profileData.email}</h4>
        </div>) : null}
    </React.Fragment>
  );
}

export default Profile;