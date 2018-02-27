import React, { Component } from 'react'
import Header from './components/header'

import './styles/App.css'

const data = {
  name: "Living",
  balance: 777
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header logged={true} location={this.props.location} payload={data}/>
      </div>
    )
  }
}

export default App;
