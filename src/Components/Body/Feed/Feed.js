import React from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  const posts = useSelector(state => state.firestore.ordered.posts);

  if(isLoaded(posts)) {
    return (
      <div className='postsDiv'>
        {posts.map((post, index) => {
          return (
            <div 
              className='post'
              key={index}>
              <h4>{post.title}</h4>
              <hr />
              <p>{post.description}</p>
            </div>
          );
        })}
      </div>
    )
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default Feed;