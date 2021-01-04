import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import {check} from "../../utils/auth";

export default class AuthMiddleware extends Component {
    state = {
        checking: true,
        redirect: true
    }

    componentDidMount() {
        check(() => {
            this.setState({checking: false, redirect: false})
        }, ()=>{
            this.setState({checking: false, redirect: true})
        });
    }

    render(){
        if(!this.state.checking){
            if(this.state.redirect){
                return (<Redirect to={'/login'}/>);
            } else {
                return this.props.children;
            }
        } else{
            return (
                <h1>Checking connection</h1>
            );
        }
    }
}
