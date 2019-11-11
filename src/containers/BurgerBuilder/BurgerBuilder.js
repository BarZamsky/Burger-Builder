import React, { Component } from 'react';
import {connect} from "react-redux"
import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary  from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler"
import * as actionTypes from "../../store/actions"

import axios from "../../axios-orders"

class BurgerBuilder extends Component {

    state = {
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props.ings)
        // axios.get("/ingredients.json")
        //     .then(res => {
        //         this.setState({ingredients:res.data})
        //     })
        //     .catch(err => this.setState({error:true}))
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
        let queryParams=[]
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]))
        }

        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
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
        if (this.state.loading) {
            orderSummary = <Spinner/>
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
            price: state.totalPrice
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
            onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))