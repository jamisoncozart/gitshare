import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import Post from '../Posts/Post';
import { useSelector } from 'react-redux'
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { Line } from 'react-chartjs-2';

let Profile = props => {
  const history = useHistory();
  const db = useFirestore();
  const [currentProfile, setCurrentProfile] = useState(null);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const profiles = useSelector(state => state.firestore.ordered.profiles);
  const currentUserProfile = db.collection('profiles').doc(props.currentUser.id);
  console.log('currentProfile in Profile.js');
  console.log(currentProfile);

  useEffect(() => {
    currentUserProfile.get().then(function(profile) {
      console.log('profile from useEffect');
      console.log(profile.data());
      setCurrentProfile(profile.data());
    }).catch(function(error) {
      console.log(error.message);
    });
  }, []);

  let topPosts;
  const userPosts = posts.filter(post => post.author == props.currentUser.name);
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
          following: props.currentlyLoggedInProfile.following.filter(user => user.name != props.currentUser.name)
        }).then(function() {
          setFollowing(false);
          props.handleRefreshingCurrentlyLoggedInUser();
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        props.currentLoggedInUserQuery.update({
          following: [...props.currentlyLoggedInProfile.following, {name: props.user.name, id: props.currentUser.id}]
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
  console.log(currentProfile);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [currentProfileInput, setCurrentProfileInput] = useState("");

  function handleGitHubProfileSubmission(event) {
    event.preventDefault();
    setShowConfirmationWindow(true);
    setCurrentProfileInput(event.target.gitHubProfile.value);
  }

  function handleProfileConfirmation() {
    let uniqueProfile = () => {
      profiles.forEach(profile => {
        if(profile.githubProfile == currentProfileInput) {
          return false;
        }
      });
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
  let initialShowActivity = false;
  if(props.currentlyLoggedInProfile.githubActivity) {
    initialShowActivity = true;
  }
  const [showActivity, setShowActivity] = useState(initialShowActivity);
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  function handleGettingGithubActivity() {
    if(props.currentlyLoggedInProfile.githubRepoNumber > 0) {
      fetch(`https://api.github.com/users/${props.currentlyLoggedInProfile.githubProfile}/events`)
        .then(response => response.json())
        .then(data => {
          const reducedActivityData = data.reduce((accumulator, event) => {
            let date = event.created_at.split('').splice(0, event.created_at.indexOf('T')).join('');
            let dateArr = date.split('-');
            let month = monthArr[parseInt(dateArr[1])]
            date = `${month} ${dateArr[2]}`;
            return {
              ...accumulator, 
              [date]: (accumulator[date] || 0) + 1
            }
          }, {});
          console.log(reducedActivityData);
          props.currentLoggedInUserQuery.update({
            githubActivity: reducedActivityData
          }).then(() => {
            props.setCurrentlyLoggedInProfile({
              ...props.currentlyLoggedInProfile,
              githubActivity: reducedActivityData
            });
            setShowActivity(true);
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
    }
  }
  let data;
  if(props.currentlyLoggedInProfile.githubActivity) {
    data = {
      labels: [...Object.keys(props.currentlyLoggedInProfile.githubActivity).reverse()],
      datasets: [{
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [...Object.values(props.currentlyLoggedInProfile.githubActivity).reverse()],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#36FF36',
          '#1225FF',
          '#FF2536'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#36FF36',
          '#1225FF',
          '#FF2536'
        ]
      }]
    };
  }
  //=======================================================

  let inputElement;
  return (
    <div className='profileBackground'>
      <div className='profile'>
        {currentProfile != null ? 
          <div className='profileHeader'>
            {!props.currentUser.currentUserProfile ? (
              <button 
                onClick={handleClickingFollow} 
                className={following ? 'activeFollowButton' : 'inactiveFollowButton'}>Follow</button>
            ) : null}
            <div className='profileTop'>
              {currentProfile.profilePic == null && props.currentlyLoggedInProfile.displayName == props.currentUser.name ? (
                <div onClick={() => inputElement.click()} className='profileImgDiv'>
                  <p>Upload<br/>Image</p>
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
              {props.currentlyLoggedInProfile.displayName == props.currentUser.name && props.currentProfile.githubProfile == null ? 
                <form onSubmit={handleGitHubProfileSubmission}>
                  <input type='text' name='gitHubProfile' placeholder='GitHub Username' required/>
                  <button 
                    onClick={() => setShowConfirmationWindow(true)} 
                    className='gitHubButton'>
                      Link GitHub
                  </button>
                </form>
                : 
                <div className='githubProfile'>
                  <h4>GitHub Profile:</h4>
                  <div className='githubProfileHeader'>
                    <div className="gitHubProfileImgDiv">
                      <img src={props.currentProfile.githubProfilePic} />
                    </div>
                    <h3>{props.currentProfile.githubProfile}</h3>
                  </div>
                  <hr />
                  <div className='githubStats'>
                    <div className='stat'>
                      <strong>{props.currentProfile.githubFollowers}</strong>
                      <p>Followers</p>
                    </div>
                    <div className='stat'>
                      <strong>{props.currentProfile.githubRepoNumber}</strong>
                      <p>Repositories</p>
                    </div>
                  </div>
                  <div className='githubBodyInfo'>
                    <p><strong>Bio:</strong> {props.currentProfile.githubBio}</p>
                    {props.currentProfile.githubPersonalWebsiteLink ? 
                      <p>
                        <strong>Website: </strong> 
                        <a href={props.currentProfile.githubPersonalWebsiteLink}>
                          {props.currentProfile.githubPersonalWebsiteLink}
                        </a>
                      </p> : null}
                  </div>

                  {props.currentlyLoggedInProfile.displayName == props.currentUser.name ? 
                    <button>Get Languages</button>
                  : null}

                  {showActivity && props.currentProfile.githubActivity ? (
                    <div className='activityDataVis'>
                      <h4>GitHub Activity</h4>
                      <Line data={data} legend={{display: false}} />
                    </div>
                  ) : 
                    <React.Fragment>
                      {props.currentlyLoggedInProfile.displayName == props.currentUser.name ? 
                        <button onClick={handleGettingGithubActivity}>Get Activity</button>
                      : null}
                    </React.Fragment>
                  }
                </div>
              }
            </div>
            <h4 className='topPostTitle'>Top Posts:</h4>
            <div className='profilePosts'>
              {topPosts.map((post, index) => {
                if(index < 6) {
                  return (
                    <Post 
                      currentUser={props.currentUser} 
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

Profile = connect(mapStateToProps)(Profile);

export default Profile;