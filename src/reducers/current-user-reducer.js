const currentUserReducer = (state = null, action) => {
  const { name, id, currentUserProfile } = action;
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        name,
        id,
        currentUserProfile
      }
    default:
      return state;
  }
}

export default currentUserReducer;