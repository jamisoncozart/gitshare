import React, { useState } from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';

function Body(props) {
  const [profileToView, setProfileToView] = useState(props.currentUser);

  const handleViewingProfile = user => {
    props.handleNavToProfile(false);
    setProfileToView(user);
  }

  // props.user === currently logged in user.
  // profileToView can be any user profile being viewed.

  return (
    <React.Fragment>
      <Route path='/posts'>
        <Feed currentUser={props.currentUser} handleViewingProfile={handleViewingProfile}/>
      </Route>
      <Route path='/saved'>
        <Saved currentUser={props.currentUser} handleViewingProfile={handleViewingProfile}/>
      </Route>
      <Route path='/newPost'>
        <NewPostForm currentUser={props.currentUser}/>
      </Route>
      <Route path='/follows'>
        <FollowList />
      </Route>
      <Route path='/profile'>
        <Profile user={props.userViewingOwnProfile ? props.currentUser : profileToView}/>
      </Route>
    </React.Fragment>
  );
}

export default Body;