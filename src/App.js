import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
           Axel Vestberg
          </h1>
        </header>
      </div>
    );
  }
}

var express = require("express");
var app = express();
var path = require('path');

export default App;
