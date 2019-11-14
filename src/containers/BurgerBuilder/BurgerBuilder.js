import React, {Component} from 'react';
import {connect} from "react-redux"
import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler"
import * as actions from "../../store/actions/index"
import axios from "../../axios-orders"

export class BurgerBuilder extends Component {

    state = {
        purchasing:false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum+el;
            },0);
       return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated)
            this.setState({purchasing: true})
        else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push('/auth')
        }
    }

    modalClosed = () => {this.setState({purchasing: false})}

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        if (this.props.ings) {
            burger = (
                <Hoc>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        addIngredientHandler={this.props.onIngredientAdded}
                        removeIngredientHandler={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Hoc>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.modalClosed}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        return (
           <Hoc>
               <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                   {orderSummary}
               </Modal>
               {burger}
           </Hoc>
        );
    }
}
    const mapStateToProps = state => {
        return {
            ings: state.burgerBuilder.ingredients,
            price: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuthenticated: state.auth.token !== null
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
            onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
            onInitIngredients: () => dispatch(actions.initIngredients()),
            onInitPurchase: () => dispatch(actions.purchaseInit()),
            onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))