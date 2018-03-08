import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HomePage = (props) => {
  return (
    <div className='home-page text-center container'>
      <h3>Welcom to Parrot Wings application</h3>
      {props.isAuthenticated ? (
        <div className='home-page-logged-in'>
          <Link to='/transaction'>Go to new transaction</Link>
        </div>
      ) : (
        <div className='home-page-logged-out'>
          <Link to='/sign-in'>Sign In</Link> or <Link to='/sign-up'>Sign Up</Link>
        </div>
      )}
    </div>
  )
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default HomePage
