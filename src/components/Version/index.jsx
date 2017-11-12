// @flow

import React, { Component } from 'react';
import update from 'immutability-helper';
import * as Api from '~models/ApiModel';

import './styles.css';

type Props = {
  color: string,
}

type State = {
  version: number,
}

export default class Version extends Component<Props, State> {
  onClick = () => {
      this.setState(state => update(state, {
        version: {
          $set: state.version + 0.1,
        },
      }));
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      version: 1.1,
    };
  }

  render() {
    return (
      <div onClick={this.onClick} className="version" style={{
          color: this.props.color,
        }}>
        {this.state.version}
      </div>
    )
  }

}
