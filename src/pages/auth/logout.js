import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import {logout} from "../../utils/auth";

class Logout extends Component {
    state = {
        redirect: false,
    }

    componentDidMount() {
        logout((data) => {
            this.setState({redirect: true})
        });
    }

    render() {
        if(this.state.redirect){
            return ( <Redirect to={'/'}/> );
        }
        return (
            <h1>Logging out</h1>
        );
    }
}

export default Logout;
