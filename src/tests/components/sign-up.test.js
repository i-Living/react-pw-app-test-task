import React from 'react'
import { Link } from 'react-router-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SignUp from '../../app/components/sign-up'

configure({ adapter: new Adapter() })
describe('<SignUp />', () => {
  const props = {
    payload: {
      email: "test@email",
      username: 'test',
      password: 'test',
      password2: 'test',
      wrongPass: false
    },
    emptyFields: {
      email: false,
      username: false,
      password: false,
      password2: false
    },
    loginError: '',
    onSubmit: () => {},
    onChange: () => {}
  }
  let component = shallow(<SignUp {...props}/>)
  it('renders 1 SignUp component', () => {
    expect(component).toHaveLength(1)
  })
  it('renders SignUp form', () => {
    expect(component.find('form')).toHaveLength(1)
  })
  it('renders SignUp inputEmail', () => {
    expect(component.find('#inputEmail')).toHaveLength(1)
  })
  it('renders SignUp inputLogin', () => {
    expect(component.find('#inputLogin')).toHaveLength(1)
  })
  it('renders SignUp inputPassword', () => {
    expect(component.find('#inputPassword')).toHaveLength(1)
  })
  it('renders SignUp inputPassword2', () => {
    expect(component.find('#inputPassword2')).toHaveLength(1)
  })
  it('renders SignUp form button', () => {
    expect(component.find('button')).toHaveLength(1)
  })
  it('renders SignUp require email notification', () => {
    props.emptyFields.email = true
    component = shallow(<SignUp {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Email is required</div>
    )).toBe(true)
  })
  it('renders SignUp require login notification', () => {
    props.emptyFields.username = true
    component = shallow(<SignUp {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Login is required</div>
    )).toBe(true)
  })
  it('renders SignUp require password notification', () => {
    props.emptyFields.password = true
    component = shallow(<SignUp {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Passwords is required</div>
    )).toBe(true)
  })
  it('renders SignUp require password2 notification', () => {
    props.emptyFields.password2 = true
    component = shallow(<SignUp {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Password confirm is required</div>
    )).toBe(true)
  })
  it('renders SignUp wrongPass notification', () => {
    props.payload.wrongPass = true
    component = shallow(<SignUp {...props}/>)
    expect(component.contains(
      <div className="form-input-error">Passwords are different</div>
    )).toBe(true)
  })
})
