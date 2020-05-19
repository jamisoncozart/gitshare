import React, { useState, useEffect } from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux'

let Body = props => {

  useFirestoreConnect([{
    collection: 'profiles',
    doc: props.currentlyLoggedUser.id
  }]);
  const updatedCurrentlyLoggedInUser = useSelector(
    ({ firestore: { data } }) => data.profiles && data.profiles[props.currentlyLoggedUser.id]
  )
  const db = useFirestore();
  const currentlyLoggedInUserQuery = db.collection('profiles').doc(props.currentlyLoggedUser.id);

  if(isLoaded(updatedCurrentlyLoggedInUser)) {
    console.log('useFirestoreConnect currently logged in user');
    console.log(updatedCurrentlyLoggedInUser.id);
  }

  // const [currentlyLoggedInProfile, setCurrentlyLoggedInProfile] = useState(null);
  // const db = useFirestore();
  // const currentlyLoggedInUser = db.collection('profiles').doc(props.currentlyLoggedUser.id);
  // useEffect(() => {
  //   currentlyLoggedInUser.get().then(function(profile) {
  //     setCurrentlyLoggedInProfile({...profile.data(), id: props.currentlyLoggedUser.id});
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }, []);

  // const handleRefreshingCurrentlyLoggedInUser = () => {
  //   currentlyLoggedInUser.get().then(function(profile) {
  //     setCurrentlyLoggedInProfile({...profile.data(), id: props.currentlyLoggedUser.id});
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }

  return (
    <React.Fragment>
      <Route path='/posts'>
        <Feed 
          currentlyLoggedInProfile={{
            ...updatedCurrentlyLoggedInUser, 
            id: props.currentlyLoggedUser.id
          }}
          currentUser={props.currentUser} 
          sortFeedObj={props.sortFeedObj}/>
      </Route>
      <Route path='/saved'>
        <Saved 
          currentUser={props.currentUser}/>
      </Route>
      <Route path='/newPost'>
        <NewPostForm currentUser={{
          ...updatedCurrentlyLoggedInUser, 
          id: props.currentlyLoggedUser.id
        }}/>
      </Route>
      <Route path='/follows'>
        <FollowList 
          currentUser={props.currentlyLoggedUser}/>
      </Route>
      <Route path='/profile'>
        <Profile 
          currentLoggedInUserQuery={currentlyLoggedInUserQuery} 
          currentlyLoggedInProfile={{
            ...updatedCurrentlyLoggedInUser, 
            id: props.currentlyLoggedUser.id
          }}
          // handleRefreshingCurrentlyLoggedInUser={handleRefreshingCurrentlyLoggedInUser} 
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