import React,{Component} from "react"
import Hoc from "../../../hoc/Hoc"
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(item => {
                return (
                    <li key={item}>
                        <span style={{textTransform:'capitalize'}}>{item}:</span> {this.props.ingredients[item]}
                    </li>
                )
            });

        return (
            <Hoc>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Hoc>
        )
    }
}

export default OrderSummary;