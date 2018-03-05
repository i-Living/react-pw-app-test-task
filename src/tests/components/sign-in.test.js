import React from 'react'
import { Link } from 'react-router-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SignIn from '../../app/components/sign-in'

configure({ adapter: new Adapter() })
describe('<SignIn />', () => {
  const props = {
    payload: {
      email: "test@email",
      password: 'test'
    },
    emptyFields: {
      email: false,
      password: false
    },
    loginError: '',
    onSubmit: () => {},
    onChange: () => {}
  }
  let component = shallow(<SignIn {...props}/>)
  it('renders 1 SignIn component', () => {
    expect(component).toHaveLength(1)
  })
  it('renders SignIn form', () => {
    expect(component.find('form')).toHaveLength(1)
  })
  it('renders SignIn inputEmail', () => {
    expect(component.find('#inputEmail')).toHaveLength(1)
  })
  it('renders SignIn inputPassword', () => {
    expect(component.find('#inputPassword')).toHaveLength(1)
  })
  it('renders SignIn form button', () => {
    expect(component.find('button')).toHaveLength(1)
  })
  it('renders SignIn require email notification', () => {
    props.emptyFields.email = true
    component = shallow(<SignIn {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Email is required</div>
    )).toBe(true)
  })
  it('renders SignIn require password notification', () => {
    props.emptyFields.password = true
    component = shallow(<SignIn {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Passwords is required</div>
    )).toBe(true)
  })
  it('renders SignIn loginError', () => {
    props.loginError = "test"
    component = shallow(<SignIn {...props}/>)
    expect(component.contains(
      <div className="form-input-error">test</div>
    )).toBe(true)
  })
})
