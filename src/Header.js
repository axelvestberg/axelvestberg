import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <Link exact to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        );
    }
}

export default Header;