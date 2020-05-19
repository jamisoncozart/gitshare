import React, { useState, useEffect } from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';

let Body = props => {
  // const [profileToView, setProfileToView] = useState(props.currentUser);
  const [currentlyLoggedInProfile, setCurrentlyLoggedInProfile] = useState(null);
  // const handleViewingProfile = () => {
  //   props.handleNavToProfile(false);
  // }
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
          sortFeedObj={props.sortFeedObj}/>
      </Route>
      <Route path='/saved'>
        <Saved 
          currentUser={props.currentUser}/>
      </Route>
      <Route path='/newPost'>
        <NewPostForm currentUser={props.currentUser}/>
      </Route>
      <Route path='/follows'>
        <FollowList 
          currentUser={props.currentUser}/>
      </Route>
      <Route path='/profile'>
        <Profile 
          currentLoggedInUserQuery={currentlyLoggedInUser} 
          currentlyLoggedInProfile={currentlyLoggedInProfile}
          setCurrentlyLoggedInProfile={setCurrentlyLoggedInProfile}
          handleRefreshingCurrentlyLoggedInUser={handleRefreshingCurrentlyLoggedInUser} 
          user={props.currentUser.currentUserProfile ? props.currentlyLoggedUser : props.currentUser}/>
      </Route>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

Body = connect(mapStateToProps)(Body);

export default Body;