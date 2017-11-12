// @flow

import React, { Component } from 'react';
import update from 'immutability-helper';
import * as Api from 'models/ApiModel';

import './styles.css';

type Props = {
  color: string,
}

type State = {
  loading: boolean,
  version: ?number,
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
      loading: true,
      version: undefined,
    };
  }

  componentWillMount() {
    Api.getVersion().then(version => this.setState(state => update(state, {
      version: {
        $set: version,
      },
      loading: {
        $set: false,
      }
    })));
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div onClick={this.onClick} className="version" style={{
          color: this.props.color,
        }}>
        {this.state.version}
      </div>
    )
  }

}
