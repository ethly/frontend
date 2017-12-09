// @flow

import React, {
  Component,
} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import styles from './styles.css'

export default class SortBox extends Component<{}> {
  render() {
    return (
      <form className={styles.container} method="get">
        <span className={styles.middle}>Or explore</span>
        <SelectField
          autoWidth={true}
          value={1}
          className={styles.select}
          style={{
            width: 100,
            display: 'inline-block',
          }}
        >
          <MenuItem value={1} primaryText="top"/>
          <MenuItem value={2} primaryText="latest"/>
          <MenuItem value={2} primaryText="oldest"/>
        </SelectField>
        <span className={styles.middle}>links</span>
      </form>
    )
  }
}
