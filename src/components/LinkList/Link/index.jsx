// @flow

import React, {
  Component,
} from 'react'

import { type LinkDescription } from 'api/entities'

import styles from './styles.css'

export default class Link extends Component<LinkDescription> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.label}>{this.props.label}</div>
        <div className={styles.url}>{this.props.url}</div>
      </div>
    )
  }
}
