const currentViewReducer = (state = '/posts', action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_VIEW':
      const { view } = action;
      return view;
    default:
      return state;
  }
}

export default currentViewReducer;