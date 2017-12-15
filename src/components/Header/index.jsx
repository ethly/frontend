// @flow

import React, {
  Component,
} from 'react'
import styles from './styles.css'
import Line from 'components/Line'

export default class Header extends Component<{}> {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>eth.ly</h1>
        <h2 className={styles.subtitle}>
          <Line/>the decentralized link storage<Line/>
        </h2>
      </div>
    )
  }
}
