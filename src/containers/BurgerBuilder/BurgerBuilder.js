import React, {Component} from 'react';
import {connect} from "react-redux"
import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler"
import * as burgerBuilderActions from "../../store/actions/index"
import axios from "../../axios-orders"

class BurgerBuilder extends Component {

    state = {
        purchasing:false
    }

    componentDidMount() {
        console.log(this.props)
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

    purchaseHandler = () => {this.setState({purchasing: true})}

    modalClosed = () => {this.setState({purchasing: false})}

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const update = {...this.state.ingredients}
    //     update[type] = oldCount+1;
    //     let price = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({totalPrice:price, ingredients: update})
    //     this.updatePurchaseState(update);
    //     console.log(update)
    // }
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0)
    //         return;
    //     const update = {...this.state.ingredients}
    //     update[type] = oldCount-1;
    //     let price = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState({totalPrice:price, ingredients: update})
    //     this.updatePurchaseState(update);
    // }

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
                        ordered={this.purchaseHandler}/>
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
            ings: state.ingredients,
            price: state.totalPrice,
            error: state.error
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
            onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
            onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients)
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))