const darkModeReducer = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_THEME':
      return !state;
    default:
      return state;
  }
}

export default darkModeReducer;