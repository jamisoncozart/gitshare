import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';

const Follow = props => {
  const db = useFirestore();
  const followProfileQuery = db.collection('profiles').doc(props.followData.id);
  const [followProfile, setFollowProfile] = useState(null);
  
  followProfileQuery.get().then(function(profile) {
    setFollowProfile(profile.data());
  }).catch(function(event) {
    console.log(event);
  });

  const handleClickingProfile = () => {
    props.handleViewingProfile({ name: props.followData.name, id: props.followData.id, currentUserProfile: false});
  }
  if(followProfile != null) {
    return (
      <div className='post'>
        <div className='followPanel'>
          <div className='followProfilePicDiv'>
            <img src={followProfile.profilePic} />
          </div>
          <Link 
            to='/profile' 
            onClick={handleClickingProfile} 
            className='followName'>
              {props.followData.name}
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className='post'>
        <h2>Loading...</h2>
      </div>
    )
  }
}

export default Follow;