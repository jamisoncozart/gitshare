import React, { useState, useEffect } from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';

function Body(props) {
  const [profileToView, setProfileToView] = useState(props.currentUser);
  const [currentlyLoggedInProfile, setCurrentlyLoggedInProfile] = useState(null);
  const handleViewingProfile = user => {
    console.log('user in handleViewingProfile in Body.js');
    console.log(user);
    props.handleNavToProfile(false);
    setProfileToView(user);
  }
  const db = useFirestore();
  const currentlyLoggedInUser = db.collection('profiles').doc(props.currentUser.id);
  useEffect(() => {
    currentlyLoggedInUser.get().then(function(profile) {
      setCurrentlyLoggedInProfile(profile.data());
    }).catch(function(error) {
      console.log(error);
    });
  }, []);

  const handleRefreshingCurrentlyLoggedInUser = () => {
    currentlyLoggedInUser.get().then(function(profile) {
      setCurrentlyLoggedInProfile(profile.data());
    }).catch(function(error) {
      console.log(error);
    });
  }

  return (
    <React.Fragment>
      <Route path='/posts'>
        <Feed 
          currentlyLoggedInProfile={currentlyLoggedInProfile}
          currentUser={props.currentUser} 
          handleViewingProfile={handleViewingProfile}
          setViewingDetails={props.setViewingDetails}
          viewingDetails={props.viewingDetails}
          sortFeedObj={props.sortFeedObj}/>
      </Route>
      <Route path='/saved'>
        <Saved 
          currentUser={props.currentUser} 
          handleViewingProfile={handleViewingProfile}/>
      </Route>
      <Route path='/newPost'>
        <NewPostForm currentUser={props.currentUser}/>
      </Route>
      <Route path='/follows'>
        <FollowList 
          handleViewingProfile={handleViewingProfile} 
          currentUser={props.currentUser}/>
      </Route>
      <Route path='/profile'>
        <Profile 
          currentLoggedInUserQuery={currentlyLoggedInUser} 
          currentlyLoggedInProfile={currentlyLoggedInProfile}
          setCurrentlyLoggedInProfile={setCurrentlyLoggedInProfile}
          handleRefreshingCurrentlyLoggedInUser={handleRefreshingCurrentlyLoggedInUser} 
          user={props.userViewingOwnProfile ? props.currentUser : profileToView}/>
      </Route>
    </React.Fragment>
  );
}

export default Body;