import React from 'react';
import { useFirestore, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

const NewPostForm = props => {
  const history = useHistory();
  const db = useFirestore();
  function addPostToDb(event) {
    event.preventDefault();
    history.push('/posts');
    return db.collection('posts').add(
      {
        title: event.target.title.value,
        description: event.target.description.value,
        score: 0,
        author: props.currentUser.name,
        authorID: props.currentUser.id,
        tags: event.target.tags.value.split(' '),
        upvoters: [],
        savers: [],
        repo: null,
        creationTime: db.FieldValue.serverTimestamp()
      }
    );
  }

  // FOR TAGS, USE onChange() HANDLER FOR INPUT TO CREATE Tag COMPONENTS FOR ALL WORDS SEPARATED BY SPACES

  return (
    <div className='newPostFormDiv'>
      <form id='newPostForm' className='siginForm' onSubmit={addPostToDb}>
        <h2>New Post</h2>
        <input 
          name='title' 
          type='text' 
          placeholder='Title' 
          required
          maxLength='100' />
        <textarea 
          name='description' 
          type='text' 
          placeholder='Description' 
          rows='4' />
        <input
          name='tags'
          type='text'
          placeholder='tag1 tag2 tag3'
          maxLength='25' />
        <button 
          className='submitButton' 
          type='submit'>
            Submit
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;