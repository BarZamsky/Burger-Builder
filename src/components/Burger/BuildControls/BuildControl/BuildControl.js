import React from "react"
import classes from "./BuildControl.css"

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.addIngredientHandler} className={classes.More}>More</button>
        <button onClick={props.removeIngredientHandler} className={classes.Less} disabled={props.disabled}>Less</button>
    </div>

)

export default buildControl;