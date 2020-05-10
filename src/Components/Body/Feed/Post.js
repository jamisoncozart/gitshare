import React, { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import Tag from './Tag';

// LET UPVOTES PERSIST FOR USER

const Post = props => {
  const auth = firebase.auth();
  const db = useFirestore();
  let currentlyUpvoted;
  if(props.post.upvoters.includes(auth.currentUser.displayName)) {
    currentlyUpvoted = true;
  } else {
    currentlyUpvoted = false;
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
        upvoters: upvoterList.filter(upvoter => upvoter !== auth.currentUser.displayName)
      }).then(function() {
        setUpvoted(false)
      }).catch(function(error) {
        console.log(error.message);
      });
    } else {
      let newUpvotes = currentUpvotes + 1;
      return postToUpdate.update({
        score: newUpvotes,
        upvoters: [...upvoterList, auth.currentUser.displayName]
      }).then(function() {
        setUpvoted(true)
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
          {auth.currentUser.displayName == props.post.author ? <button className='postDeleteButton' onClick={() => handleDeletingPost(props.post.id)}>X</button> : null}
        </div>
        <hr />
        <div className='tagAuthorRow'>
          <div className='tags'>
            {props.post.tags.length > 0 ? props.post.tags.map((tag, index) => {
              return <Tag filterFeedByTag={() => null} name={tag} key={index}/>
            }) : null}
          </div>
          <p className='postAuthor'>{props.post.author}</p>
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
              return <Tag filterFeedByTag={props.filterFeedByTag} name={tag} key={index}/>
            }) : null}
          </div>
          <p className='postAuthor'>{props.post.author}</p>
        </div>
      </div>
    );
  }
}

export default Post;