import React, { useState } from 'react'
import { useFirestore, isLoaded } from 'react-redux-firebase';

const Comment = props => {
  const db = useFirestore();
  const upvotedAlready = props.comment.upvoters.includes(props.currentUser.name);
  const [upvoted, setUpvoted] = useState(upvotedAlready);
  const handleCommentUpvote = () => {
    const commentToUpdate = db.collection('comments').doc(props.comment.id);
    if(upvoted) {
      return commentToUpdate.update({
        score: props.comment.score - 1,
        upvoters: props.comment.upvoters.filter(user => user !== props.currentUser.name)
      }).then(function() {
        setUpvoted(false);
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      return commentToUpdate.update({
        score: props.comment.score + 1,
        upvoters: [...props.comment.upvoters, props.currentUser.name]
      }).then(function() {
        setUpvoted(true);
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

  const [showCommentReplyForm, setShowCommentReplyForm] = useState(false);

  const handleCommentReplySubmission = event => {
    event.preventDefault();
    //add reply to comment in firebase
    const thisComment = db.collection('comments').doc(props.comment.id);
    thisComment.update({
      replies: [...props.comment.replies, {body: event.target.body.value, author: props.currentUser.name}]
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handleClickingCommentAuthor = () => {
    //handle navigation to profile page of author
  }

  return (
    <div className='comment'>
      {/* <div onClick={() => handleCommentUpvote(props.comment.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}> */}
      <div className='commentHeader'>
        <div onClick={handleCommentUpvote} className={upvoted ? 'clickedCommentUpvoteDiv' : 'commentUpvoteDiv'}>
          <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14645659851540882612-256.png' />
        </div>
        <p className='commentBody'>{props.comment.text}</p>
      </div>
      <div className='commentFooter'>
        <button 
          onClick={() => setShowCommentReplyForm(!showCommentReplyForm)} className='commentReplyButton'>Reply</button>
        <h5 onClick={handleClickingCommentAuthor} className='commentAuthor'>{props.comment.author}</h5>
      </div>
      {showCommentReplyForm ? (
        <form onSubmit={handleCommentReplySubmission} className='commentReplyForm'>
          <input type='text' name='body' />
          <button type='submit' className='commentReplySubmit'>Submit</button>
        </form>
      ) : null}
      <div className='commentReplies'>
        {props.comment.replies.map((reply, index) => {
          return (
            <div className='reply' key={index}>
              <p>{reply.body}</p>
              <p className='commentAuthor'>{reply.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Comment;