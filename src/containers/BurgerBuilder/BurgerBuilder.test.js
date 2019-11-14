import React from "react"
import {BurgerBuilder} from "./BurgerBuilder"
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"

configure({adapter: new Adapter()})

describe("BurgerBuilder", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it('should not render BuildControls when ingredients are null', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0)
    })

    it('should render BuildControls when receiveing ingredients', () => {
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
