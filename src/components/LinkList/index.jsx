// @flow

import React, { Component } from 'react';
import update from 'immutability-helper';

import type { Link } from 'common/Link';
import * as Api from 'models/ApiModel';

import styles from './styles.css';

type Props = {
}

type State = {
  loading: boolean,
  linkList: Array<Link>
}

export default class Version extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      linkList: []
    }
  }

  componentWillMount() {
    Api.getLinks().then(listItems => this.setState(state => update(state, {
      loading: {
        $set: false,
      },
      linkList: {
        $set: listItems,
      }
    })));
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const listItems = this.state.linkList.map((link: Link, key: number) =>
      <li key={key}>
        <span className={styles.itemLabel}>{link.label}</span>
        <span className={styles.itemUrl}>{link.url}</span>
     </li>
    );
    return (
      <div className={styles.version}>
        <ul className={styles.linkList}>{listItems}</ul>
      </div>
    );
  }
}
