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
  const [tagFiltering, setTagFiltering] = useState(false);
  const [filterTag, setFilterTag] = useState();
  function handleShowingPostDetails(post) {
    setViewingDetails(true);
    setPostDetails(post);
  }

  function handleFilterTag(tagName) {
    setTagFiltering(true);
    setFilterTag(tagName);
  }

  let posts = useSelector(state => state.firestore.ordered.posts);
  if(tagFiltering) {
    posts = posts.filter(post => post.tags.includes(filterTag));
  }

  if(isLoaded(posts)) {
    if(!viewingDetails) {
      return (
        <div className='postsDiv'>
          {posts.map((post, index) => {
            return (
              <Post 
                showDetails={false}
                handleShowingPostDetails={handleShowingPostDetails}
                handleClickingBack={null}
                handleFilterTag={handleFilterTag}
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