import React, { Component } from "react";
import './home.css';
import {Link} from "react-router-dom";

class Home extends Component {
    state={

    }

    componentDidMount() {

    }


    render() {
        return (
            <div>home <Link to={'/logout'}>test</Link></div>
        );
    }
}

export default Home;
