import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import Post from '../Posts/Post';
import { useSelector } from 'react-redux'
import firebase from 'firebase/app';

const Profile = props => {
  console.log('props.user in Profile.js');
  console.log(props.user);
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
  if(props.currentlyLoggedInProfile.following.includes(props.user.name)) {
    currentlyFollowing = true;
  }
  const [following, setFollowing] = useState(currentlyFollowing);
  const handleClickingFollow = () => {
    if(props.currentlyLoggedInProfile != null) { 
      if(following) {
        props.currentLoggedInUserQuery.update({
          following: props.currentlyLoggedInProfile.following.filter(user => user.name != props.user.name)
        }).then(function() {
          setFollowing(false);
          props.handleRefreshingCurrentlyLoggedInUser();
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        props.currentLoggedInUserQuery.update({
          following: [...props.currentlyLoggedInProfile.following, {name: props.user.name, id: props.user.id}]
        }).then(function() {
          setFollowing(true);
          props.handleRefreshingCurrentlyLoggedInUser();
        }).catch(function(error) {
          console.log(error);
        });
      }
    } else {
      console.log('null unfortunately');
    }
  }

  //=========================================================
  // IMAGE STORAGE

  const storageRef = firebase.storage().ref();
  const handleProfilePicSubmission = event => {
    const fileType = event.target.files[0].type;
    const file = event.target.files[0];
    console.log(file);
    const metadata = {
      contentType: fileType
    }
    const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload Progress: ' + progress);
      }, function(error) {
        console.log(error);
        switch (error.code) {
          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            console.log("User canceled the upload");
            break;      
          case 'storage/unknown':
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log(downloadURL);
          currentUserProfile.update({
            profilePic: downloadURL
          }).then(function() {
            setCurrentProfile({...currentProfile, profilePic: downloadURL});
          }).catch(function(error) {
            console.log(error);
          });
        });
      });
  }

  //=========================================================

  return (
    <div className='profileBackground'>
      <div className='profile'>
        {currentProfile != null ? 
          <div className='profileHeader'>
            {props.currentlyLoggedInProfile.displayName != props.user.name ? (
              <button 
                onClick={handleClickingFollow} 
                className={following ? 'activeFollowButton' : 'inactiveFollowButton'}>Follow</button>
            ) : null}
            <div className='profileTop'>
              {currentProfile.profilePic == null && props.currentlyLoggedInProfile.displayName == props.user.name ? (
                <form>
                  <input onChange={handleProfilePicSubmission} type="file" id="img" name="img" multiple/>
                </form>
              ) : currentProfile.profilePic == null ? (
                <div className='profileImgDiv'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYk3Khp02Ov-8AGyTerkOhnIuMrnJFO2KfpFSojzc0TKKyKknX&usqp=CAU' />
                </div>
              ) : (
                <div className='profileImgDiv'>
                  <img src={currentProfile.profilePic} />
                </div>
              )}
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