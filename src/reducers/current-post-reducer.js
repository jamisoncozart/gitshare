const currentPostReducer = (state = {}, action) => {
  console.log('in reducer');
  switch (action.type) {
    case 'UPDATE_CURRENT_POST':
      const { author, authorID, creationTime, description, repo, savers, score, tags, title, upvoters } = action;
      console.log('action in reducer');
      console.log(action);
      return {
        author,
        authorID,
        creationTime,
        description,
        repo,
        savers,
        score,
        tags,
        title,
        upvoters
      }
    default:
      return state;
  }
}

export default currentPostReducer;