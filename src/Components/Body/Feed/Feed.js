import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';

const Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  // For viewing post details on click of a post
  const [viewingDetails, setViewingDetails] = useState(false);
  const [postDetails, setPostDetails] = useState();
  function handleShowingPostDetails(post) {
    setViewingDetails(true);
    setPostDetails(post);
  }

  function filterFeedByTag(tagName) {
    console.log(tagName);
  }

  const posts = useSelector(state => state.firestore.ordered.posts);

  if(isLoaded(posts)) {
    if(!viewingDetails) {
      return (
        <div className='postsDiv'>
          {posts.map((post, index) => {
            return (
              <Post 
                filterFeedByTag={filterFeedByTag}
                showDetails={false}
                handleShowingPostDetails={handleShowingPostDetails}
                handleClickingBack={null}
                post={post}
                key={index}/>
            );
          })}
        </div>
      )
    } else {
      return (
        <Post showDetails={true} post={postDetails} handleClickingBack={setViewingDetails} />
      )
    }
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default Feed;