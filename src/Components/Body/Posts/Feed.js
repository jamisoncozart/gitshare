import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import Post from './Post';
import Tag from './Tag';
import { connect } from 'react-redux';

let Feed = props => {
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  const [tagFiltering, setTagFiltering] = useState(false);
  const [filterTag, setFilterTag] = useState();
  function handleShowingPostDetails(post) {
    console.log('post in handleShowingPostDetails')
    console.log(post);
    const action = {
      type: 'UPDATE_CURRENT_POST',
      ...post
    }
    const action2 = {
      type: 'SHOW_DETAILS'
    }
    props.dispatch(action);
    props.dispatch(action2);
  }

  function handleFilterTag(tagName) {
    setTagFiltering(true);
    setFilterTag(tagName);
  }

  function handleNavBackToFeed() {
    const action = {
      type: 'HIDE_DETAILS'
    }
    props.dispatch(action);
  }

  let posts = useSelector(state => state.firestore.ordered.posts);
  if(tagFiltering) {
    posts = posts.filter(post => post.tags.includes(filterTag));
  }
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
          <React.Fragment>
          <div className='postsDiv'>
            <div className='filterTag'>
              <div className='filterTagHeader'>
                <p>Filtering by: </p>
                <Tag name={filterTag} />
              </div>
              <button className='clearButton' onClick={() => setTagFiltering(false)}>Clear</button>
            </div> 
            {sortedPosts.map((post) => {
              return (
                <Post 
                  currentUser={props.currentUser}
                  showDetails={false}
                  handleShowingPostDetails={handleShowingPostDetails}
                  handleClickingBack={null}
                  handleFilterTag={handleFilterTag}
                  darkMode={props.darkMode}
                  post={post}
                  key={post.id}/>
              );
            })}
          </div>
          </React.Fragment> : (
            <div className='postsDiv'>
              <div className='postFeed'>
                {sortedPosts.map((post) => {
                  return (
                    <Post 
                      currentUser={props.currentUser}
                      showDetails={false}
                      handleShowingPostDetails={handleShowingPostDetails}
                      handleClickingBack={null}
                      handleFilterTag={handleFilterTag}
                      darkMode={props.darkMode}
                      post={post}
                      key={post.id}/>
                  );
                })}
              </div>
            </div>
          )}
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
          handleClickingBack={handleNavBackToFeed} />
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
    viewingDetails: state.viewingDetails,
    darkMode: state.darkMode
  }
}

Feed = connect(mapStateToProps)(Feed);

export default Feed;