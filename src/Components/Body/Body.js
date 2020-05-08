import React from 'react';
import Feed from './Feed/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import { Route } from 'react-router-dom';

function Body() {
  return (
    <React.Fragment>
      <Route path='/posts'>
        <Feed />
      </Route>
      <Route path='/saved'>
        <Feed />
      </Route>
      <Route path='/newPost'>
        <NewPostForm />
      </Route>
      <Route path='/follows'>
        <FollowList />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </React.Fragment>
  );
}

export default Body;