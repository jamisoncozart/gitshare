import React, { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import Tag from './Tag';
import { Link } from 'react-router-dom';

// LET UPVOTES PERSIST FOR USER

const Post = props => {
  console.log(props.currentUser);
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
      console.log('post deleted');
      props.handleClickingBack(false);
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handleChangingProfileView = () => {
    console.log(props.handleViewingProfile);
    if(props.handleViewingProfile) {
      if(props.currentUser.name == props.post.author) {
        props.handleViewingProfile({ name: props.post.author, id: props.post.authorID, currentUserProfile: true});
      } else {
        props.handleViewingProfile({ name: props.post.author, id: props.post.authorID, currentUserProfile: false});
      }
    }
  }

  if(props.showDetails) {
    return (
      <div className='post'>
        <div className='postHeaderWrapper'>
          <div className='postHeader'>
            <div onClick={() => handleUpvote(props.post.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}>
              <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14645659851540882612-256.png' />
            </div>
            <h4 onClick={() => props.handleShowingPostDetails({...props.post})}>{props.post.title}</h4>
          </div>
          {/* Display Delete if user owns the post, display Save if user does not */}
          {props.currentUser.name == props.post.author ? 
            <button className='postDeleteButton' onClick={() => handleDeletingPost(props.post.id)}>X</button> :
            <button className={currentlySaved ? 'activeSaved' : 'inactiveSaved'} onClick={() => handleSavingPost(props.post.id)}>
              <img src='https://www.shareicon.net/data/256x256/2016/09/10/828155_save_487x512.png' />
            </button>}
        </div>
        <hr />
        <div className='tagAuthorRow'>
          <div className='tags'>
            {props.post.tags.length > 0 ? props.post.tags.map((tag, index) => {
              return <Tag name={tag} key={index}/>
            }) : null}
          </div>
          <Link to='/profile' onClick={handleChangingProfileView} className='postAuthor'>{props.post.author}</Link>
        </div>
        <p>{props.post.description}</p>
        <button className='detailsBackButton' onClick={() => props.handleClickingBack(false)}>Back</button>
      </div>
    );
  } else {
    return (
      <div className='post'>
        <div className='postHeader'>
          <div onClick={() => handleUpvote(props.post.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}>
            <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14645659851540882612-256.png' />
          </div>
          <h4 onClick={() => props.handleShowingPostDetails({...props.post})}>{props.post.title}</h4>
        </div>
        <hr />
        <div className='tagAuthorRow'>
          <div className='tags'>
            {props.post.tags.length > 0 ? props.post.tags.map((tag, index) => {
              return <Tag filterFeedByTag={props.handleFilterTag} name={tag} key={index}/>
            }) : null}
          </div>
          <Link to='/profile' onClick={handleChangingProfileView} className='postAuthor'>{props.post.author}</Link>
        </div>
      </div>
    );
  }
}

export default Post;