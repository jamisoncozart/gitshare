import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';

let Follow = props => {
  const db = useFirestore();
  const followProfileQuery = db.collection('profiles').doc(props.followData.id);
  const [followProfile, setFollowProfile] = useState(null);
  const iconPath = process.env.PUBLIC_URL + '/assets/';
  
  followProfileQuery.get().then(function(profile) {
    setFollowProfile(profile.data());
  }).catch(function(event) {
    console.log(event);
  });

  const handleClickingProfile = () => {
    const action = {
      type: 'SET_CURRENT_USER',
      name: props.followData.name,
      id: props.followData.id,
      currentUserProfile: false
    }
    props.dispatch(action);
  }
  
  if(followProfile != null) {
    return (
      <div className='post'>
        <div className='followPanel'>
          <div className='followProfilePicDiv'>
            <img src={followProfile.profilePic ? followProfile.profilePic : `${iconPath}Profile_black.png`} />
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

Follow = connect()(Follow);

export default Follow;