import React from "react";
import {Redirect} from 'react-router-dom';

import Login from "../pages/guest/login";

import Logout from "../pages/auth/logout";
import Home from "../pages/auth/home/home";

const guestRoutes= [
    {path: "/login", component: <Login />},
    {path: "/", component: <Redirect to="/home" />},
];

const authRoutes= [
    {path: "/home", component: <Home />},
    {path: "/logout", component: <Logout />},
]

export {guestRoutes, authRoutes};
