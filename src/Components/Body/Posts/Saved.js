import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';
import Tag from './Tag';
import firebase from 'firebase/app';

const Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);
  const auth = firebase.auth();

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
  
  if(isLoaded(posts)) {
    let savedPosts = posts.filter(post => post.savers.includes(auth.currentUser.displayName));
    if(tagFiltering) {
      savedPosts = savedPosts.filter(post => post.tags.includes(filterTag));
    }
    if(!viewingDetails) {
      return (
        <React.Fragment>
          {tagFiltering ? 
            <div className='filterTag'>
              <div className='filterTagHeader'>
                <p>Filtering by: </p>
                <Tag name={filterTag} />
              </div>
              <button onClick={() => setTagFiltering(false)}>Clear</button>
            </div> : null}
          <div className='postsDiv'>
            {savedPosts.map((post, index) => {
              return (
                <Post 
                  currentUser={props.currentUser}
                  showDetails={false}
                  handleShowingPostDetails={handleShowingPostDetails}
                  handleClickingBack={null}
                  handleFilterTag={handleFilterTag}
                  handleViewingProfile={props.handleViewingProfile}
                  post={post}
                  key={index}/>
              );
            })}
          </div>
        </React.Fragment>
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