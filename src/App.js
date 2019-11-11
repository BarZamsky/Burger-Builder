import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom"
import Layout from "./containers/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import ContactData from "./containers/checkout/ContactData"

class App extends Component {
  render() {
    return (
        <div>
         <Layout>
             <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                 <Route path="/checkout" component={Checkout}/>
                 <Route path="/orders" component={Orders}/>
             </Switch>
         </Layout>
        </div>
    );
  }
}

export default App;
