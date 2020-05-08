import React from 'react';

const NewPostForm = props => {

  function handleFormSubmission(event) {
    event.preventDefault();
    //Add newPost to DB from form inputs
  }

  return (
    <div className='newPostFormDiv'>
      <form className='siginForm' onSubmit={handleFormSubmission}>
        <h2>New Post</h2>
        <input name='PostTitle' type='text' placeholder='Title' />
        <textarea name='PostDescription' type='text' placeholder='Description' rows='4' />
        <button className='submitButton' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewPostForm;