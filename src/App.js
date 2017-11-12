// @flow
import React, { Component } from 'react';
import Version from 'components/Version';
import LinkList from 'components/LinkList';
import styles from './App.css';

class App extends Component<Object> {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <h1 className={styles['App-title']}>Decentralized link storage.</h1>
          <div className={styles['App-version']}>
            <Version/>
          </div>
        </header>
        <LinkList/>
      </div>
    );
  }
}

export default App;
