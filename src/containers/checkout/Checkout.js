import React,{Component} from "react"
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import ContactData from "./ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import * as actions from "../../store/actions"

class Checkout extends Component{

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.push('/checkout/contact-data');
    }



    render() {
        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.onCheckoutCancelled}
                        onCheckoutContinued={this.onCheckoutContinued}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>)
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);