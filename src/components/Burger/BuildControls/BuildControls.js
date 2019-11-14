import React from "react"
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(item => {
            return <BuildControl
                key={item.label}
                label={item.label}
                addIngredientHandler={() => props.addIngredientHandler(item.type)}
                removeIngredientHandler = {() => props.removeIngredientHandler(item.type)}
                disabled={props.disabled[item.type]} />
        })}

        <button
            onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;