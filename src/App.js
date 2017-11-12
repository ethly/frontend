// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import Version from 'components/Version';
import './App.css';

class App extends Component<Object> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Version color="blue"/>
      </div>
    );
  }
}

export default App;
