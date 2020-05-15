import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';
import Tag from './Tag';

const Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  // For viewing post details on click of a post
  const [postDetails, setPostDetails] = useState();
  const [tagFiltering, setTagFiltering] = useState(false);
  const [filterTag, setFilterTag] = useState();
  function handleShowingPostDetails(post) {
    props.setViewingDetails(true);
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

  console.log(posts);
  console.log(props.sortFeedObj);
  let sortedPosts = posts;
  if(isLoaded(posts)) {
    if(!props.viewingDetails) {
      if(props.sortFeedObj.sortByTop) {
        sortedPosts = posts.slice().sort((a, b) => parseInt(b.score) - parseInt(a.score));
      }
      if(props.sortFeedObj.sortByFollow) {
        sortedPosts = sortedPosts.filter(post => props.currentlyLoggedInProfile.following.includes(post.author));
        console.log(posts);
      }
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
            {sortedPosts.map((post, index) => {
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
        <Post 
          currentUser={props.currentUser} 
          showDetails={true} 
          post={postDetails} 
          handleClickingBack={props.setViewingDetails} />
      )
    }
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default Feed;