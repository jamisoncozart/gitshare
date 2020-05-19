import React from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
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
            user={props.currentUser.currentUserProfile ? props.currentlyLoggedUser : props.currentUser}/>
        </Route>
      </React.Fragment>
    );
  } else {
    return <h2>Loading...</h2>
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

Body = connect(mapStateToProps)(Body);

export default Body;