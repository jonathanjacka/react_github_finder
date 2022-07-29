import React from 'react'
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../context/github/GithubContext';

import NotFound from './NotFound';


function User() {

    const { getUser, notFound, user } = useContext(GithubContext);
    const { username } = useParams();

    useEffect(() => {
        getUser(username);
    }, [username]);

if(notFound) {
    return <NotFound />
} else {
    return (
        <div>
          <h1>User: {user.name}</h1>
        </div>
      )
} 




}

export default User
