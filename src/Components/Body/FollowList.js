import React, { useState, useEffect } from 'react';
import { useFirestore, isLoaded } from 'react-redux-firebase';
import Follow from './Follow';

const FollowList = props => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const db = useFirestore();
  const currentUserProfile = db.collection('profiles').doc(props.currentUser.id);
  useEffect(() => {
    currentUserProfile.get().then(function(profile) {
      setCurrentProfile(profile.data());
    }).catch(function(error) {
      console.log(error);
    });
  }, []);
  if(currentProfile != null) {
    let follows = currentProfile.following.filter(profile => profile.name != props.currentUser.name);
    return (
      <div className='followList'>
        {follows.map((follow, index) => {
          return (
            <Follow 
              followData={follow} 
              key={index} />
          );
        })}
      </div>
    );
  } else {
    return <h2>Loading...</h2>
  }
}

export default FollowList;