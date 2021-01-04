import React, { Component } from "react";
import {Switch, Route} from 'react-router-dom';
import {guestRoutes, authRoutes} from './routes';
import AuthMiddleware from "./middlewares/authMiddleware";

export default class Router extends Component {
    render(){
        return(
            <div className={'w-100 h-100'}>
                <Switch>
                    {authRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            render={()=>{return( <AuthMiddleware>{route.component}</AuthMiddleware> )}}
                            key={idx}
                        />
                    ))}
                    {guestRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            render={ () => {return( route.component )}}
                            key={idx}
                        />
                    ))}
                </Switch>
            </div>
        );
    }
}