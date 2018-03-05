import React from 'react'
import { Link } from 'react-router-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import HomePage from '../../app/components/home-page'

configure({ adapter: new Adapter() })
describe('<HomePage />', () => {
  let props = {
    isAuthenticated: true,
  }
  it('renders 1 HomePage component', () => {
    const component = shallow(<HomePage {...props}/>)
    expect(component).toHaveLength(1)
  })
  it('renders authenticated HomePage', () => {
    const component = shallow(<HomePage {...props}/>)
    expect(component.find(".home-page-logged-in")).toHaveLength(1)
  })
  it('renders not authenticated HomePage', () => {
    props.isAuthenticated = false
    const component = shallow(<HomePage {...props}/>)
    expect(component.find(".home-page-logged-out")).toHaveLength(1)
  })
})
