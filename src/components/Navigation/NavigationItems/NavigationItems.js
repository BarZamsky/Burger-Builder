import React from "react"
import classes from "./NavigationItems.css"
import Item from "./Item/Item"

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <Item link="/" exact>Burger Builder</Item>
        {props.isAuthenticated ? <Item link="/orders">Orders</Item> : null}
        {!props.isAuthenticated ? <Item link="/auth">Authenticate</Item> : <Item link="/logout">Logout</Item>}
    </ul>
)

export default navigationItems;