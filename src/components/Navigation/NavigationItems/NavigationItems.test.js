import React from "react"
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from "./NavigationItems"
import Item from "./Item/Item"

configure({adapter: new Adapter()})

describe("NavigationItems", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>)
    })

    it('should render two NavigationItems if not authenticated', () => {
        expect(wrapper.find(Item)).toHaveLength(2)
    })

    it('should render three NavigationItems if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(Item)).toHaveLength(3)
    })

    it('should should contain logout link', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toEqual(true)
    })
})
