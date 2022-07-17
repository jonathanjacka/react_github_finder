import React, { useEffect, useState } from 'react';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {

    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });

        const data = await res.json();
        setUsers(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
              {users.map((user, index) => <UserItem key={user.id} user={user}/>)}
            </div>
          )
    }


}

export default UserResults
