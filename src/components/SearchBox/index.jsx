// @flow

import React, {
  Component,
} from 'react'
import TextField from 'material-ui/TextField'

import styles from './styles.css'

export default class SearchBox extends Component<{}> {
  render() {
    return (
      <form className={styles.container} method="get">
        Find links by a hashtag:
        <TextField className={styles.hashtag} name="hashtag" hintText="#HashTag"/>
      </form>
    )
  }
}
