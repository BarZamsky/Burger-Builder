import React, {Component} from "react";
import {connect} from "react-redux"
import Hoc from "../Hoc"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

import classes from "./Layout.css"

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {this.setState({showSideDrawer:false})}

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Hoc>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Hoc>
        )
    }
}

const mapPropsToState = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapPropsToState)(Layout);