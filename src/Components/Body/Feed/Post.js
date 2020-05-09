import React, { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';

// LET UPVOTES PERSIST FOR USER

const Post = props => {
  const auth = firebase.auth();
  const db = useFirestore();
  let currentlyUpvoted;
  if(props.upvoters.includes(auth.currentUser.displayName)) {
    currentlyUpvoted = true;
  } else {
    currentlyUpvoted = false;
  }
  const [upvoted, setUpvoted] = useState(currentlyUpvoted);
  let currentUpvotes = props.score;
  let upvoterList = props.upvoters;
  const handleUpvote = (postId) => {
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
  console.log(props.score);
  return (
    <div 
      className='post'
      key={props.index}>
      <div className='postHeader'>
        <div onClick={() => handleUpvote(props.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}>
          <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14645659851540882612-256.png' />
        </div>
        <h4>{props.title}</h4>
      </div>
      <hr />
      <p>{props.description}</p>
    </div>
  )
}

export default Post;