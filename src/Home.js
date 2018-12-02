import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

class Home extends Component {
    render() {
        return (
        <div id="canvas">
        <P5Wrapper sketch={sketch} />
        </div>   
        );
    }
}

export default Home;