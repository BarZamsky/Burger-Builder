import React, {Component} from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import {connect} from "react-redux"
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler"
import * as actions from "../../store/actions"
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component{

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner/>
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state.auth.token)
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));