const initialState={
        snackbar: false,
        snackbar_message: null,
        snackbar_type: null
}

const snackbarReducers= (state = {...initialState}, action) => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return {
        ...state,
        snackbar: true,
        snackbar_message: action.message,
        snackbar_type: action.snackbarType
      };
    case 'HIDE_SNACKBAR':
      return {
        ...state,
        snackbar: false
      };
    default:
      return state;
  }
};


export default snackbarReducers;