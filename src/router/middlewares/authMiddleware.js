import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {checkToken} from "../../utils/auth";

export default class AuthMiddleware extends Component {
    state = {
        checking: true,
        redirect: true
    }

    componentDidMount() {
        checkToken((data) => {
            if(data.message && data.message === "valid"){
                this.setState({checking: false, redirect: false})
            }
        }, (data)=>{
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
                <MDBContainer className={'h-100'}>
                    <MDBRow center className={'h-100'}>
                        <MDBCol middle={true} sm="8" className="text-center">
                            <h1>Checking connection</h1>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
    }
}
