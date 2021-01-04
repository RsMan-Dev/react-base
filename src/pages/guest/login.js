import React, { Component } from "react";
import {check, login} from "../../utils/auth";
import {Redirect} from 'react-router-dom';

class Login extends Component {
    state = {
        redirect: false,
        error:false,
        checking: true
    }

    componentDidMount() {
        check((data) => {
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
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        mail
                        <input
                            name="email" type={'text'}
                            className={`text-light ${this.state.error ? 'invalid' : ''}`}
                            onChange={() => { this.changeHandler() }} required
                        />
                        <br/>
                        passwd
                        <input
                            name="password" type={'password'}
                            className={`text-light ${this.state.error ? 'invalid' : ''}`}
                            onChange={() => { this.changeHandler() }} required
                        />
                        <small>
                            {this.state.error ? ' Mot de passe ou Email invalide(s)' :''}
                        </small>
                        <button type={"submit"}>Se
                            connecter</button>
                    </form>
                );
            }
        } else{
            return (
                <h1>Checking connection</h1>
            );
        }

    }
}

export default Login;
