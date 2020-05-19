import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import Post from '../Posts/Post';
import { useSelector } from 'react-redux'
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';

let Profile = props => {
  const history = useHistory();
  const db = useFirestore();
  const [currentProfile, setCurrentProfile] = useState(null);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const profiles = useSelector(state => state.firestore.ordered.profiles);
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

  const [following, setFollowing] = useState(false);
  if(currentProfile && !following) {
    for(let i = 0; i < props.currentlyLoggedInProfile.following.length; i++) {
      if(props.currentlyLoggedInProfile.following[i].name == currentProfile.displayName) {
        setFollowing(true);
        break;
      }
    }
  }
  console.log('following');
  console.log(following);
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

  const handleChangingCurrentPost = (post) => {
    const action = {
      type: 'UPDATE_CURRENT_POST',
      ...post
    }
    const action2 = {
      type: 'SHOW_DETAILS'
    }
    props.dispatch(action);
    props.dispatch(action2);
    history.push('/posts');
  }

  //========================================================
  // GITHUB PROFILE DATA

  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [currentProfileInput, setCurrentProfileInput] = useState("");

  function handleGitHubProfileSubmission(event) {
    event.preventDefault();
    setShowConfirmationWindow(true);
    setCurrentProfileInput(event.target.gitHubProfile.value);
  }

  function handleProfileConfirmation() {
    console.log('inside fetch function');
    let uniqueProfile = () => {
      profiles.forEach(profile => {
        if(profile.githubProfile == currentProfileInput) {
          return false;
        }
      })
      return true;
    };
    if(uniqueProfile) {
      let apiData;
      fetch(`https://api.github.com/users/${currentProfileInput}`)
        .then(response => response.json())
        .then(data => {
          apiData = data;
          props.currentLoggedInUserQuery.update({
            githubProfile: currentProfileInput,
            githubProfilePic: data.avatar_url,
            githubBio: data.bio,
            githubFollowers: data.followers,
            githubName: data.name,
            githubRepoNumber: data.public_repos,
            githubPersonalWebsiteLink: data.blog ? data.blog : null
          }).then(() => {
            setShowConfirmationWindow(false);
            props.setCurrentlyLoggedInProfile({
              ...props.currentlyLoggedInProfile,
              githubProfile: currentProfileInput,
              githubProfilePic: data.avatar_url,
              githubBio: data.bio,
              githubFollowers: data.followers,
              githubName: data.name,
              githubRepoNumber: data.public_repos,
              githubPersonalWebsiteLink: data.blog ? data.blog : null
            });
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
    } else {
      alert('That profile is already being used');
    }
  }

  //=======================================================

  let inputElement;
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
                <div onClick={() => inputElement.click()} className='profileImgDiv'>
                  <p>Upload</p>
                  <form style={{display: 'none'}}>
                    <input 
                      ref={input => inputElement = input}
                      className='imageUploadButton' 
                      onChange={handleProfilePicSubmission} 
                      type="file" 
                      id="img" 
                      name="img" 
                      multiple/>
                  </form>
                </div>
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
            <div className='gitHubData'>
              {props.currentlyLoggedInProfile.displayName == props.user.name && props.currentlyLoggedInProfile.githubProfile == null ? (
                <form onSubmit={handleGitHubProfileSubmission}>
                  <input type='text' name='gitHubProfile' placeholder='GitHub Username' required/>
                  <button 
                    onClick={() => setShowConfirmationWindow(true)} 
                    className='gitHubButton'>
                      Link GitHub
                  </button>
                </form>
              ) : null }
              {props.currentlyLoggedInProfile.githubProfile != null ? (
                <div className='githubProfile'>
                  <h4>GitHub Profile:</h4>
                  <div className='githubProfileHeader'>
                    <div className="gitHubProfileImgDiv">
                      <img src={props.currentlyLoggedInProfile.githubProfilePic} />
                    </div>
                    <h3>{props.currentlyLoggedInProfile.githubProfile}</h3>
                  </div>
                  <hr />
                  <div className='githubStats'>
                    <div className='stat'>
                      <strong>{props.currentlyLoggedInProfile.githubFollowers}</strong>
                      <p>Followers</p>
                    </div>
                    <div className='stat'>
                      <strong>{props.currentlyLoggedInProfile.githubRepoNumber}</strong>
                      <p>Repositories</p>
                    </div>
                  </div>
                  <div className='githubBodyInfo'>
                    <p><strong>Bio:</strong> {props.currentlyLoggedInProfile.githubBio}</p>
                    <p><strong>Website:</strong> <a href={props.currentlyLoggedInProfile.githubPersonalWebsiteLink}>{props.currentlyLoggedInProfile.githubPersonalWebsiteLink}</a></p>
                  </div>
                  <button>Get Languages</button>
                  <button>Get Activity</button>
                </div>
              ) : null}
            </div>
            <h4 className='topPostTitle'>Top Posts:</h4>
            <div className='profilePosts'>
              {topPosts.map((post, index) => {
                if(index < 6) {
                  return (
                    <Post 
                      currentUser={props.user} 
                      showDetails={false}
                      handleShowingPostDetails={handleChangingCurrentPost}
                      post={post} 
                      key={index} />
                  )
                }
              })}
            </div>
          </div> :
          <h3>Loading...</h3>
        }
      </div>
      {showConfirmationWindow ? 
        <Modal 
          currentProfileInput={currentProfileInput} 
          setShowConfirmationWindow={setShowConfirmationWindow}
          handleProfileConfirmation={handleProfileConfirmation}/> 
        : null}
    </div>
  )
}

Profile = connect()(Profile);

export default Profile;