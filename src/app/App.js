import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Header from './components/header'

import './styles/App.css'

const user = {
  name: "Living",
  balance: 777
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header logged={false} location={this.props.location} user={user}/>
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}

export default connect(mapStateToProps)(App)
