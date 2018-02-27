import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import '../styles/login-form.css'

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp text-center container">
        <h3>
          <Link to='/sign-in'>Sign in </Link>
          / Sign up
        </h3>
        <form className="form-signin">
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
          <label htmlFor="inputLogin" className="sr-only">Login</label>
          <input type="text" id="inputLogin" className="form-control no-br" placeholder="Login" />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" />
          <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign up </button>
        </form>
      </div>
    )
  }
}

export default SignUp
