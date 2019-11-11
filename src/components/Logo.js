import React from "react"
import classes from "./Logo.css"

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={require("../assets/images/burger-logo.png")} alt="logo"/>
    </div>
)

export default logo;