import React from "react"
import classes from "./Toolbar.css"
import Logo from "../../Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Toggle from "../SideDrawer/Toggle"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;