import React from 'react';
import { useFirestore } from 'react-redux-firebase';

const NewPostForm = props => {
  const db = useFirestore();
  function addPostToDb(event) {
    event.preventDefault();
    return db.collection('posts').add(
      {
        title: event.target.title.value,
        description: event.target.description.value
      }
    );
  }

  // FOR TAGS, USE onChange() HANDLER FOR INPUT TO CREATE Tag COMPONENTS FOR ALL WORDS SEPARATED BY SPACES

  return (
    <div className='newPostFormDiv'>
      <form className='siginForm' onSubmit={addPostToDb}>
        <h2>New Post</h2>
        <input name='title' type='text' placeholder='Title' />
        <textarea name='description' type='text' placeholder='Description' rows='4' />
        <button className='submitButton' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewPostForm;