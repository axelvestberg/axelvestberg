import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.js';

class App extends Component {
  render() {
    return (
      <div>
       <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default App;
