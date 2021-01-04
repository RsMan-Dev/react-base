import React, { Component } from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import {Redirect} from 'react-router-dom';
import logo from '../../assets/img/1300-1300-max.png'
import {checkToken, login} from "../../utils/auth";

class Login extends Component {
    state = {
        redirect: false,
        error:false,
        checking: true
    }

    componentDidMount() {
        checkToken((data) => {
            this.setState({checking: false, error: false, redirect: true})
        }, (data)=>{
            this.setState({checking: false, error: false, redirect: false})
        });
    }

    submitHandler(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        login(formData.get('email'),formData.get('password'),
            data => {
                this.setState({redirect:true, error:false});
            }, data => {
                this.setState({redirect:false, error:true});
            });
    };

    changeHandler(){
        this.setState({error:false});
    }

    render() {
        if(!this.state.checking){
            if(this.state.redirect){
                return ( <Redirect to={'/'}/> );
            } else {
                return (
                    <MDBContainer className={'h-100'}>
                        <MDBRow center className={'h-100'}>
                            <MDBCol middle={true} lg="8" sm="10" className="text-center">
                                <MDBRow>
                                    <MDBCol md={'4'}>
                                        <img src={logo} alt="Logo" className={'w-75'} style={{maxWidth: '200px'}}/>
                                    </MDBCol>
                                    <MDBCol middle={true} md={'8'} className={'text-sm-left'}>
                                        <h1>NEW’EE® Connect</h1>
                                        <h3>Se connecter</h3>
                                    </MDBCol>
                                </MDBRow>
                                <form onSubmit={(e) => this.submitHandler(e)}>
                                    <MDBInput
                                        name="email" label={'Email'} type={'email'}
                                        className={`text-light ${this.state.error ? 'invalid' : ''}`}
                                        onChange={() => { this.changeHandler() }} required
                                    />
                                    <MDBInput
                                        name="password" label={'Mot de passe'} type={'password'}
                                        className={`text-light ${this.state.error ? 'invalid' : ''}`}
                                        onChange={() => { this.changeHandler() }} required
                                    >
                                    <small id="emailHelp" className="form-text text-danger" style={{minHeight: '19px'}}>
                                        {this.state.error ? ' Mot de passe ou Email invalide(s)' :''}
                                    </small>
                                    </MDBInput>
                                    <MDBBtn outline circle type={"submit"} color={"primary"} className={'shadow-none'}>Se
                                        connecter</MDBBtn>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                );
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

export default Login;
