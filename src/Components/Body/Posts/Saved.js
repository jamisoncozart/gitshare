import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';
import Tag from './Tag';
// import firebase from 'firebase/app';

const Saved = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);
  // const auth = firebase.auth();

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
  console.log('Saved.js: currentlyLoggedInProfile');
  console.log(props.currentlyLoggedInProfile);
  if(isLoaded(posts)) {
    let savedPosts = posts.filter(post => post.savers.includes(props.currentlyLoggedInProfile.displayName));
    if(tagFiltering) {
      savedPosts = savedPosts.filter(post => post.tags.includes(filterTag));
    }
    if(!viewingDetails) {
      return (
        <React.Fragment>
          <div className='postsDiv'>
            {tagFiltering ? 
              <div className='filterTag'>
                <div className='filterTagHeader'>
                  <p>Filtering by: </p>
                  <Tag name={filterTag} />
                </div>
                <button onClick={() => setTagFiltering(false)}>Clear</button>
              </div> : null}
            {savedPosts.map((post, index) => {
              return (
                <Post 
                  currentlyLoggedInProfile={props.currentlyLoggedInProfile}
                  showDetails={false}
                  handleShowingPostDetails={handleShowingPostDetails}
                  handleClickingBack={null}
                  handleFilterTag={handleFilterTag}
                  post={post}
                  key={index}/>
              );
            })}
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <Post 
          currentlyLoggedInProfile={props.currentlyLoggedInProfile}
          showDetails={true} 
          post={postDetails} 
          handleClickingBack={setViewingDetails} />
      )
    }
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default Saved;