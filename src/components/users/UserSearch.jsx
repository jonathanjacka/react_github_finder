import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

import { searchUsers } from '../../context/github/GithubActions';

function UserSearch() {

    const [ text, setText ] = useState('');

    const { users, dispatch: userDispatch } = useContext(GithubContext);
    const { dispatch: alertDispatch } = useContext(AlertContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(text === '') {
          setAlert();
        } else {
          userDispatch({type: 'SET_LOADING'});
          const users = await searchUsers(text);
          userDispatch({type: 'GET_USERS', payload: users});
          setText('');
        }
    }

    const setAlert = () => {
      alertDispatch({type: 'SET_ALERT', payload: {message: 'Please enter a search term', type: 'error'}});
      setTimeout(() => {alertDispatch({type: 'REMOVE_ALERT'})}, 3000);
    }

    const handleClearUsers = () => {
      userDispatch({type: 'CLEAR_USERS'});
    }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-8'>

      <div className="">
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <div className="relative">
                    <input type="text" className='w-full pr-40 bg-gray-200 input input-lg text-black' placeholder='Search' value={text} onChange={event => setText(event.target.value)}/>
                    <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
                </div>
            </div>
        </form>
      </div>
        {users.length > 0 && 
        <div>
            <button className='btn btn-ghost btn-lg text-gray-200' onClick={handleClearUsers}>Clear</button>
        </div>}
    </div>
  )
}

export default UserSearch
