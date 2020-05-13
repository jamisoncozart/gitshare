import React from 'react'

const Comment = props => {
  return (
    <div className='comment'>
      {/* <div onClick={() => handleCommentUpvote(props.comment.id)} className={upvoted ? 'clickedUpvoteDiv' : 'upvoteDiv'}> */}
      <div className='commentHeader'>
        <div className='commentUpvoteDiv'>
          <img src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14645659851540882612-256.png' />
        </div>
        <p className='commentBody'>{props.comment.text}</p>
      </div>
      <div className='commentFooter'>
        <button className='commentReplyButton'>Reply</button>
        <h5 className='commentAuthor'>{props.comment.author}</h5>
      </div>
    </div>
  )
}

export default Comment;