const currentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_POST':
      const { author, authorID, creationTime, description, repo, savers, score, tags, title, upvoters, id } = action;
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
        upvoters,
        id
      }
    default:
      return state;
  }
}

export default currentPostReducer;