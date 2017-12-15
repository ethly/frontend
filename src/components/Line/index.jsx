// @flow

import React, {
  Component,
} from 'react'
import styles from './styles.css'
import cx from 'classnames'

type Props = {
  inline: boolean,
}

export default class Line extends Component<Props> {
  static defaultProps ={
    inline: true,
  }
  render() {
    return (
      <div className={
        cx(styles.margin, this.props.inline ? styles.inline : null)
      }>
        —
      </div>
    )
  }
}
