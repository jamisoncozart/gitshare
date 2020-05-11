import React from 'react';
import Feed from './Posts/Feed';
import FollowList from './FollowList';
import Profile from './Profile/Profile';
import NewPostForm from './NewPostForm';
import Saved from './Posts/Saved';
import { Route } from 'react-router-dom';

function Body() {
  return (
    <React.Fragment>
      <Route path='/posts'>
        <Feed />
      </Route>
      <Route path='/saved'>
        <Saved />
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