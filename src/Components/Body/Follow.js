import React from 'react';
import { Link } from 'react-router-dom';

const Follow = props => {
  console.log('props.followData in Follow.js');
  console.log(props.followData);
  const handleClickingProfile = () => {
    props.handleViewingProfile({ name: props.followData.name, id: props.followData.id, currentUserProfile: false});
  }

  return (
    <div className='post'>
      <Link 
        to='/profile' 
        onClick={handleClickingProfile} 
        className='followName'>
          {props.followData.name}
      </Link>
      <p>{props.followData.id}</p>
    </div>
  );
}

export default Follow;