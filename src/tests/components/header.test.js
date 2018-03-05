import React from 'react'
import { Link } from 'react-router-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Header from '../../app/components/header'

configure({ adapter: new Adapter() })
describe('<Header />', () => {
  let props = {
    location: {},
    isAuthenticated: true,
    user: {
        username: 'test',
        balance: 1,
    }
  }
  let component = shallow(<Header {...props}/>)
  it('renders 1 Header component', () => {
    expect(component).toHaveLength(1)
  })
  it('renders Header authenticated user data', () => {
    expect(component.find(".user").text()).toEqual("test: 1")
  })
  it('not renders Header authenticated user data', () => {
    props.user = {}
    component = shallow(<Header {...props}/>)
    expect(component.find(".user").text()).toEqual("")
  })
  it('renders Header navigation section', () => {
    expect(component.find(".header-navigation")).toHaveLength(1)
  })
  it('renders Header Logout link', () => {
    props.isAuthenticated = false
    expect(component.contains(
      <Link to='/logout'> Logout </Link>
    )).toBe(true)  })
  it('renders Header login-section', () => {
    props.isAuthenticated = false
    component = shallow(<Header {...props}/>)
    expect(component.find(".login-section")).toHaveLength(1)
  })
})
