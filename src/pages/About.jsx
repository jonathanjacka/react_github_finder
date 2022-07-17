import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function About() {
  return (
    <div>
      <h1 className='text-6xl mb-4'>Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href='https://www.udemy.com/course/react-front-to-back-2022/'>
          {' '}
          React Front To Back
        </a>{' '}
        Udemy course by
        <strong>
          <a href='https://traversymedia.com'> Brad Traversy</a>
        </strong>
        .
      </p>
      <p className='text-lg text-gray-400'>
        Version <span>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Layout By:
        <a href='https://twitter.com/hassibmoddasser'>
           &nbsp; Hassib Moddasser
        </a>
      </p>
      <div style={{marginTop: '30px'}}>
      <Link className='btn btn-primary btn-lg' to='/'>
            <FaHome className='mr-2' />
            Back To Home
          </Link>

      </div>

    </div>
  )
}

export default About
