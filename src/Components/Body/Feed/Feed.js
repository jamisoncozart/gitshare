import React from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';

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
            <Post 
              title={post.title}
              description={post.description}
              score={post.score}
              upvoters={post.upvoters}
              id={post.id}
              index={index}/>
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