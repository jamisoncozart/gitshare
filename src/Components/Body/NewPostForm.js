import React from 'react';
import { useFirestore, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app';

const NewPostForm = props => {
  const auth = firebase.auth();
  const db = useFirestore();
  function addPostToDb(event) {
    event.preventDefault();
    if(((isLoaded(auth)) && (auth.currentUser != null))) {
      return db.collection('posts').add(
        {
          title: event.target.title.value,
          description: event.target.description.value,
          score: 0,
          author: auth.currentUser.displayName,
          tags: event.target.tags.value.split(' '),
          upvoters: [],
          savers: [],
          repo: null,
        }
      );
    } else {
      alert('🚨 something went wrong! 🚨');
    }
  }

  // FOR TAGS, USE onChange() HANDLER FOR INPUT TO CREATE Tag COMPONENTS FOR ALL WORDS SEPARATED BY SPACES

  return (
    <div className='newPostFormDiv'>
      <form className='siginForm' onSubmit={addPostToDb}>
        <h2>New Post</h2>
        <input 
          name='title' 
          type='text' 
          placeholder='Title' 
          required
          maxlength='100' />
        <textarea 
          name='description' 
          type='text' 
          placeholder='Description' 
          rows='4' />
        <input
          name='tags'
          type='text'
          placeholder='tag1 tag2 tag3'
          maxlength='25' />
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