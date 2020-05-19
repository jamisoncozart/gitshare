const viewingDetailsReducer = (state = false, action) => {
  switch(action.type) {
    case 'SHOW_DETAILS':
      return true;
    case 'HIDE_DETAILS':
      return false;
    default:
      return state;
  }
}

export default viewingDetailsReducer;