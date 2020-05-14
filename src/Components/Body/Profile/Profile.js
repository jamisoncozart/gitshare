import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useFirestore, isLoaded } from 'react-redux-firebase';
import Post from '../Posts/Post';
import { useSelector } from 'react-redux'

const Profile = props => {
  const db = useFirestore();
  const [currentProfile, setCurrentProfile] = useState(null);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const currentUserProfile = db.collection('profiles').doc(props.user.id);

  useEffect(() => {
    currentUserProfile.get().then(function(profile) {
      setCurrentProfile(profile.data());
    }).catch(function(error) {
      console.log(error.message);
    });
  }, []);
  let topPosts;
  const userPosts = posts.filter(post => post.author == props.user.name);
  topPosts = userPosts.sort((a, b) => b.score - a.score);
  
  let currentlyFollowing = false;
  if(currentProfile != null) {
    if(currentProfile.following.includes(props.user.name)) {
      currentlyFollowing = true;
    }
  }
  const [following, setFollowing] = useState(currentlyFollowing);
  const handleClickingFollow = () => {
    if(following) {
      currentUserProfile.update({
        following: [...currentProfile.following.filter(user => user != props.currentlyLoggedInUser.name)]
      }).then(function() {
        setFollowing(false);
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      currentUserProfile.update({
        following: [...currentProfile.following, props.currentlyLoggedInUser.name]
      }).then(function() {
        setFollowing(true);
      }).catch(function(error) {
        console.log(error);
      });
    }
    //update currentLoggedInProfile
    // then
    //toggle following state based on og value
  }

  return (
    <div className='profileBackground'>
      <div className='profile'>
        {currentProfile != null ? 
          <div className='profileHeader'>
            <div className='profileTop'>
              {props.currentlyLoggedInUser.name != props.user.name ? (
                <button 
                  onClick={handleClickingFollow} 
                  className={following ? 'activeFollowButton' : 'inactiveFollowButton'}>Follow</button>
              ) : null}
              <div className='profileImgDiv'>
                <img src={currentProfile.profilePic} />
              </div>
              <h2>{currentProfile.displayName}</h2>
            </div>
            <h4 className='topPostTitle'>Top Posts:</h4>
            <div className='posts'>
              {topPosts.map((post, index) => {
                if(index < 6) {
                  return (
                    <Post currentUser={props.user} post={post} key={index} />
                  )
                }
              })}
            </div>
          </div> :
          <h3>Loading...</h3>
        }
      </div>
    </div>
  )
}

export default Profile;