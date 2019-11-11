import React from "react"
import {NavLink} from "react-router-dom";

import classes from "./Item.css"

const item = (props) => (
    <li className={classes.Item}>
        <NavLink
            to={props.link}
            activeClassName={classes.active} exact={props.exact}>{props.children}</NavLink>
    </li>
)

export default item;