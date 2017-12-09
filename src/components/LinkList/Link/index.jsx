// @flow

import React, {
  Component,
} from 'react'

import styles from './styles.css'

type Props = {
  label: string,
  url: string,
}

export default class Link extends Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.label}>{this.props.label}</div>
        <div className={styles.url}>{this.props.url}</div>
      </div>
    )
  }
}
