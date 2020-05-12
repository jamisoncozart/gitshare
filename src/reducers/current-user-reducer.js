const currentUserReducer = (state = null, action) => {
  const { displayName, id, email, profilePic } = action;
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        displayName,
        id,
        email,
        profilePic
      }
    default:
      return state;
  }
}

export default currentUserReducer;