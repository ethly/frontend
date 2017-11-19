// @flow

import React, { Component } from 'react';
import update from 'immutability-helper';
import * as Api from 'models/ApiModel';

import styles from './styles.css';

type Props = {
}

type State = {
  version: number,
}

export default class Version extends Component<Props, State> {

  static defaultProps = {
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      version: 0.01,
    };
  }

  render() {
    return (
      <div className={styles.version}>
        version: {this.state.version}
      </div>
    )
  }

}
