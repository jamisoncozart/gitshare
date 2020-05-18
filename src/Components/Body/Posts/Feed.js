import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Post from './Post';
import Tag from './Tag';
import { connect } from 'react-redux';

let Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  // For viewing post details on click of a post
  // const [postDetails, setPostDetails] = useState();
  const [tagFiltering, setTagFiltering] = useState(false);
  const [filterTag, setFilterTag] = useState();
  function handleShowingPostDetails(post) {
    console.log('post in handleShowingPostDetails')
    console.log(post);
    props.setViewingDetails(true);
    const action = {
      type: 'UPDATE_CURRENT_POST',
      ...post
    }
    props.dispatch(action);
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
  let sortedPosts = posts;
  if(isLoaded(posts)) {
    if(!props.viewingDetails) {
      if(props.sortFeedObj.sortByFollow) {
        sortedPosts = sortedPosts.filter(post => props.currentlyLoggedInProfile.following.map(follow => follow.name).includes(post.author));
      }
      if(props.sortFeedObj.sortByTop) {
        sortedPosts = sortedPosts.slice().sort((a, b) => parseInt(b.score) - parseInt(a.score));
      }
      if(props.sortFeedObj.sortByNew) {
        sortedPosts = sortedPosts.slice().sort((a, b) => parseInt(b.creationTime.seconds) - parseInt(a.creationTime.seconds));
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
          <div className={'postsDiv'}>
            {sortedPosts.map((post, index) => {
              return (
                <Post 
                  currentUser={props.currentUser}
                  showDetails={false}
                  handleShowingPostDetails={handleShowingPostDetails}
                  handleClickingBack={null}
                  handleFilterTag={handleFilterTag}
                  handleViewingProfile={props.handleViewingProfile}
                  darkMode={props.darkMode}
                  post={post}
                  key={post.id}/>
              );
            })}
          </div>
        </React.Fragment>
      )
    } else {
      console.log('current post in Redux');
      console.log(props.currentPost)
      return (
        <Post 
          currentUser={props.currentUser} 
          showDetails={true} 
          post={props.currentPost} 
          handleClickingBack={props.setViewingDetails} />
      )
    }
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.currentPost,
    darkMode: state.darkMode
  }
}

Feed = connect(mapStateToProps)(Feed);

export default Feed;