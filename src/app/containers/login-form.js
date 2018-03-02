import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { login, signup } from '../actions/user'
import SignIn from '../components/sign-in'
import SignUp from '../components/sign-up'
import '../styles/login-form.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInData: {
        email: '',
        password: ''
      },
      signUpData: {
        username: '',
        password: '',
        password2: '',
        email: '',
        wrongPass: false
      },
      location: this.props.location
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.props.location.pathname === "/sign-in"
    ? this.setState({
        signInData: { ...this.state.signInData, [e.target.name]: e.target.value }
      })
    : this.setState({
        signUpData: { ...this.state.signUpData, [e.target.name]: e.target.value }
      }, function () {
        this.state.signUpData.password !== this.state.signUpData.password2
        ? this.setState({signUpData: { ...this.state.signUpData, wrongPass: true }})
        : this.setState({signUpData: { ...this.state.signUpData, wrongPass: false }})
      })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.location.pathname === "/sign-in"
    ? this.props.login(this.state.signInData).then(this.props.history.push("/transaction"))
    : this.props.signup(this.state.signUpData).then(this.props.history.push("/transaction"))
  }

  render() {
    return (
      <div>
        {this.props.location.pathname === "/sign-in"
          ? (<div className="sign-in text-center container">
              <h3>
                Sign in /
                <Link to='/sign-up'> Sign up</Link>
              </h3>
              <SignIn payload={this.state.signInData} onSubmit={this.onSubmit} onChange={this.onChange} />
            </div>
          )
          : (<div className="sign-up text-center container">
              <h3>
                <Link to='/sign-in'>Sign in </Link>
                / Sign up
              </h3>
              <SignUp payload={this.state.signUpData} loginError={this.props.loginError} onSubmit={this.onSubmit} onChange={this.onChange} />
            </div>
          )
        }
      </div>
    )
  }
}

LoginForm.propTypes = {
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loginError: state.user.loginError ? state.user.loginError : ''
  }
}

const mapDispatchToProps = {
  login,
  signup
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
