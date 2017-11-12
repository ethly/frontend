// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import Version from 'components/Version';
import styles from './App.css';

class App extends Component<Object> {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          <img src={logo} className={styles["App-logo"]} alt="logo" />
          <h1 className={styles["App-title"]}>Welcome to React</h1>
        </header>
        <Version/>
      </div>
    );
  }
}

export default App;
