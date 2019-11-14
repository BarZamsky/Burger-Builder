import React,{Component} from "react"
import {connect} from "react-redux"
import Button from "../../components/UI/Button/Button"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import Input from "../../components/UI/Input/Input"
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler"
import * as actions from "../../store/actions/index"
import {updateObject} from "../../shared/utility";

import classes from "./ContactData.css"

class ContactData extends Component{
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true

                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true

                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true

                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElem in this.state.orderForm) {
            formData[formElem] = this.state.orderForm[formElem].value
        }

        let order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity = (value, rules) => {
        let isValid = true

        if (rules.required)
            isValid = value.trim() !== '' && isValid
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    onChangeHandler = (e, inputKey) => {


        const elem = updateObject(this.state.orderForm[inputKey], {
            value: e.target.value,
            valid: this.checkValidity(e.target.value, this.state.orderForm[inputKey].validation),
            touched: true
        })

        const updated = updateObject(this.state.orderForm, {
            [inputKey]: elem
        })

        let formIsValid = true
        for (let key in updated) {
            formIsValid = updated[key].valid && formIsValid
        }
        this.setState({orderForm: updated, formIsValid:formIsValid})
    }

    render() {
        const array = []
        for (let key in this.state.orderForm) {
            array.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {array.map(elem => (
                    <Input key={elem.id}
                           elementType={elem.config.elementType}
                           elementConfig={elem.config.elementConfig}
                           value={elem.config.value}
                           invalid={!elem.config.valid}
                           shouldValidate={elem.config.validation}
                           touched={elem.config.touched}
                           onChange={(e) => this.onChangeHandler(e, elem.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading)
            form = <Spinner/>
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios))