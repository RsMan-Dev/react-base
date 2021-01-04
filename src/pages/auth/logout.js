import React, { Component } from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Redirect} from 'react-router-dom';
import {logout} from "../../utils/auth";

class Logout extends Component {
    state = {
        redirect: false,
    }

    componentDidMount() {
        logout((data) => {
            this.setState({redirect: true})
        }, (data)=>{
            this.setState({redirect: true})
        });
    }

    render() {
        if(this.state.redirect){
            return ( <Redirect to={'/'}/> );
        }
        return (
            <MDBContainer className={'h-100'}>
                <MDBRow center className={'h-100'}>
                    <MDBCol middle={true} sm="8" className="text-center">
                        <h1>Logging out</h1>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Logout;
