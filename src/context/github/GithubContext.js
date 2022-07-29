import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    notFound: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await res.json();

    dispatch({ type: 'GET_USERS', payload: items });
  };

  //get single user
  const getUser = async (username) => {
    try {
      setLoading();

      const res = await fetch(`${GITHUB_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });

      if (res.status === 404) {
        throw new Error('User not found poo');
      }

      const data = await res.json();

      dispatch({ type: 'GET_SINGLE_USER', payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: 'NOT_FOUND' });
    }
  };

  //set loading in state for loading spinner
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  //clear users from state
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        notFound: state.notFound,
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
