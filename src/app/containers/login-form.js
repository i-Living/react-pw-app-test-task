import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { login, signup } from '../actions/user'
import { goToSignIn, goToSignUp } from '../actions/login-form'
import SignIn from '../components/sign-in'
import SignUp from '../components/sign-up'
import '../styles/login-form.css'

class LoginForm extends Component {
  constructor (props) {
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
      emptyFields: {
        email: false,
        username: false,
        password: false,
        password2: false
      },
      location: this.props.location
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.clearState = this.clearState.bind(this)
    this.onGoToSignIn = this.onGoToSignIn.bind(this)
    this.onGoToSignUp = this.onGoToSignUp.bind(this)
  }

  /**
   * Updates state data from input
   * @param  {[event]} e Click event
   */
  onChange (e) {
    this.props.location.pathname === '/sign-in'
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

  /**
   * Starts submit action.
   * @param  {[event]} e Form submit event
   */
  onSubmit (e) {
    e.preventDefault()
    this.checkInput()
  }

  /**
   * If input is valid then submit data, if no response error then redirect to transaction.
   */
  sendData () {
    const emptyFields = this.state.emptyFields
    const location = this.props.location.pathname
    if (!emptyFields.username && !emptyFields.password && location === '/sign-in') {
      this.props.login(this.state.signInData).then(() => {
        this.props.loginError === '' && this.props.history.push('/transaction')
      })
    }
    if (!emptyFields.email &&
      !emptyFields.username &&
      !emptyFields.password &&
      !emptyFields.password2 &&
      location === '/sign-up') {
      this.props.signup(this.state.signUpData).then(() => {
        this.props.loginError === '' && this.props.history.push('/transaction')
      })
    }
  }

  /**
   * Checks if input is valid and calls sendData function.
   */
  checkInput () {
    const location = this.props.location.pathname
    let state = {}
    let emptyFields = this.state.emptyFields
    if (location === '/sign-in') {
      state = this.state.signInData
    }
    if (location === '/sign-up') {
      state = this.state.signUpData
    }
    if (state) {
      for (let item in state) {
        state[item] === ''
          ? emptyFields[item] = true
          : emptyFields[item] = false
      }
    }
    this.setState({emptyFields: emptyFields}, function () {
      this.sendData()
    })
  }

  onGoToSignIn () {
    this.props.goToSignIn()
    this.clearState()
  }
  onGoToSignUp () {
    this.props.goToSignUp()
    this.clearState()
  }

  clearState () {
    this.setState({
      emptyFields: {
        email: false,
        username: false,
        password: false,
        password2: false
      }
    })
  }

  render () {
    return (
      <div>
        {this.props.location.pathname === '/sign-in' &&
          <div className='sign-in text-center container'>
            <h3>
              Sign in /
              <Link to='/sign-up' onClick={this.onGoToSignUp}> Sign up</Link>
            </h3>
            <SignIn
              payload={this.state.signInData}
              emptyFields={this.state.emptyFields}
              loginError={this.props.loginError}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
            />
          </div>}
        {this.props.location.pathname === '/sign-up' &&
          <div className='sign-up text-center container'>
            <h3>
              <Link to='/sign-in' onClick={this.onGoToSignIn}>Sign in </Link>
              / Sign up
            </h3>
            <SignUp
              payload={this.state.signUpData}
              emptyFields={this.state.emptyFields}
              loginError={this.props.loginError}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
            />
          </div>}
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
  signup,
  goToSignIn,
  goToSignUp
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
