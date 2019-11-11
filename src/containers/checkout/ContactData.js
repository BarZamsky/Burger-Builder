import React,{Component} from "react"
import {connect} from "react-redux"
import Button from "../../components/UI/Button/Button"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import Input from "../../components/UI/Input/Input"

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
                    maxLength: 5

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
                    required: true

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
                valid: true
            }
        },
        formIsValid: false,
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {}
        for (let formElem in this.state.orderForm) {
            formData[formElem] = this.state.orderForm[formElem].value
        }

        let order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push("/")
            })
            .catch(err => this.setState({loading: false}))
    }

    checkValidity = (value, rules) => {
        let isValid = true

        if (rules.required)
            isValid = value.trim() !== '' && isValid
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid

        return isValid
    }

    onChangeHandler = (e, inputKey) => {
        const updated = {
            ...this.state.orderForm
        }

        const elem = {...updated[inputKey]}
        elem.value = e.target.value
        if (elem.validation)
            elem.valid = this.checkValidity(elem.value, elem.validation)
        elem.touched = true
        updated[inputKey] = elem

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
        if (this.state.loading)
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)