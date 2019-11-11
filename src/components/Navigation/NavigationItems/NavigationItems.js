import React from "react"
import classes from "./NavigationItems.css"
import Item from "./Item/Item"

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <Item link="/" exact>Burger Builder</Item>
        <Item link="/orders">Orders</Item>
    </ul>
)

export default navigationItems;