const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        notFound: false,
      };

    case 'GET_SINGLE_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        notFound: false,
      };

    case 'SET_LOADING':
      return { ...state, loading: true };

    case 'CLEAR_USERS':
      return { ...state, users: [] };

    case 'CLEAR_SINGLE_USER':
      return { ...state, user: {} };

    case 'NOT_FOUND':
      return { ...state, loading: false, notFound: true };

    default:
      return state;
  }
};

export default githubReducer;
