import React, { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Comment from './Comment';

// LET UPVOTES PERSIST FOR USER

const Post = props => {

  useFirestoreConnect([
    { collection: 'comments' }
  ]);

  const iconPath = process.env.PUBLIC_URL + '/assets/';
  const db = useFirestore();
  let currentlyUpvoted = false;
  if(props.post.upvoters.includes(props.currentUser.name)) {
    currentlyUpvoted = true;
  }
  const [upvoted, setUpvoted] = useState(currentlyUpvoted);
  let currentUpvotes = props.post.score;
  let upvoterList = props.post.upvoters;

  function handleUpvote(postId) {
    const postToUpdate = db.collection('posts').doc(postId);
    if(upvoted) {
      let newUpvotes = currentUpvotes - 1;
      return postToUpdate.update({
        score: newUpvotes,
        upvoters: upvoterList.filter(upvoter => upvoter !== props.currentUser.name)
      }).then(function() {
        setUpvoted(false)
      }).catch(function(error) {
        console.log(error.message);
      });
    } else {
      let newUpvotes = currentUpvotes + 1;
      return postToUpdate.update({
        score: newUpvotes,
        upvoters: [...upvoterList, props.currentUser.name]
      }).then(function() {
        setUpvoted(true)
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
  let postSaved = false;
  if(props.post.savers.includes(props.currentUser.name)) {
    postSaved = true;
  }
  const [currentlySaved, setCurrentlySaved] = useState(postSaved);

  function handleSavingPost(postId) {
    const postToUpdate = db.collection('posts').doc(postId);
    let savedList = props.post.savers;
    if(!currentlySaved) {
      return postToUpdate.update({
        savers: [...savedList, props.currentUser.name]
      }).then(function() {
        setCurrentlySaved(true);
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      return postToUpdate.update({
        savers: savedList.filter(saver => saver != props.currentUser.name)
      }).then(function() {
        setCurrentlySaved(false);
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

  function handleDeletingPost(id) {
    db.collection('posts').doc(id).delete().then(function() {
      props.handleClickingBack(false);
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handleChangingProfileView = () => {
    if(props.handleViewingProfile) {
      if(props.currentUser.name == props.post.author) {
        props.handleViewingProfile({ name: props.post.author, id: props.post.authorID, currentUserProfile: true});
      } else {
        props.handleViewingProfile({ name: props.post.author, id: props.post.authorID, currentUserProfile: false});
      }
    }
  }

  const handleCommentSubmission = event => {
    event.preventDefault();
    db.collection('comments').add(
      {
        text: event.target.comment.value,
        author: props.currentUser.name,
        authorID: props.currentUser.id,
        parentPostID: props.post.id,
        score: 0,
        upvoters: [],
        replies: []
      }
    )
  }

  const [showCommentForm, setShowCommentForm] = useState(false);
  const comments = useSelector(state => state.firestore.ordered.comments);
  if(isLoaded(comments)) {
    const postComments = comments.filter(comment => comment.parentPostID == props.post.id);
    postComments.sort((a, b) => b.score - a.score);
    if(props.showDetails) {
      return (
        <React.Fragment>
          <button 
            className='detailsBackButton' 
            onClick={() => props.handleClickingBack(false)}>
              <img src='https://cdn.iconscout.com/icon/free/png-256/left-chevron-458460.png' />
          </button>
          <div className='post'>
            <div className='postHeader'>
              <div onClick={() => handleUpvote(props.post.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}>
                <img src={props.darkMode ? `${iconPath}up-arrow_white.png` : `${iconPath}up-arrow_black.png`} />
              </div>
              {/* Display Delete if user owns the post, display Save if user does not */}
              {props.currentUser.name == props.post.author ? 
                <button className='postDeleteButton' onClick={() => handleDeletingPost(props.post.id)}>X</button> :
                <button className={currentlySaved ? 'activeSaved' : 'inactiveSaved'} onClick={() => handleSavingPost(props.post.id)}>
                  <img src='https://www.shareicon.net/data/256x256/2016/09/10/828155_save_487x512.png' />
                </button>}
              <h4>{props.post.title}</h4>
            </div>
            <hr />
            <div className='tagAuthorRow'>
              <div className='tags'>
                {props.post.tags.length > 0 ? props.post.tags.map((tag, index) => {
                  return <Tag onFeed={false} name={tag} key={index}/>
                }) : null}
              </div>
              <Link 
                to='/profile' 
                onClick={handleChangingProfileView} 
                className='postAuthor'>
                  {props.post.author}
              </Link>
            </div>
            <p className='postDescription'>{props.post.description}</p>
            <p 
              className='commentLink' 
              onClick={() => setShowCommentForm(!showCommentForm)}>
                Comment
            </p>
            {showCommentForm ? (
              <form className='commentForm' onSubmit={handleCommentSubmission}>
                <input type='text' name='comment' placeholder='comment' />
                <button type='submit'>Submit</button>
              </form>
            ) : null}
            {postComments.map((comment, index) => {
              return(
                <Comment darkMode={props.darkMode} currentUser={props.currentUser} comment={comment} key={index} />
              )
            })}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={props.darkMode ? 'darkPost' : 'post'}>
          <div onClick={() => handleUpvote(props.post.id)} className={upvoted ? (props.darkMode ? 'darkClickedUpvoteDiv' : 'clickedUpvoteDiv') : (props.darkMode ? 'darkUpvoteDiv' : 'upvoteDiv')}>
            <img src={props.darkMode ? `${iconPath}up-arrow_white.png` : `${iconPath}up-arrow_black.png`} />
          </div>
          <div className='postHeader'>
            <h4 onClick={() => props.handleShowingPostDetails({...props.post})}>{props.post.title}</h4>
          </div>
          <hr />
          <div className='tagAuthorRow'>
            <div className='tags'>
              {props.post.tags.length > 0 ? props.post.tags.map((tag, index) => {
                return <Tag 
                  onFeed={true} 
                  filterFeedByTag={props.handleFilterTag} 
                  name={tag} 
                  darkMode={props.darkMode}
                  key={index}/>
              }) : null}
            </div>
            <Link to='/profile' onClick={handleChangingProfileView} className={props.darkMode ? 'darkPostAuthor' : 'postAuthor'}>{props.post.author}</Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className='post'>
        <h2>Loading...</h2>
      </div>
    )
  }
}

export default Post;