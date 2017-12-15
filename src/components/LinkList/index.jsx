// @flow

import React from 'react'
import {List, ListItem} from 'material-ui/List'

import ComponentWithData from 'components/ComponentWithData'
import type { Link } from 'common/Link'
import * as Api from 'models/ApiModel'
import styles from './styles.css'

import LinkComponent from './Link'

type Props = {
}

export default class Version extends ComponentWithData<Props, Array<Link>, {}> {
  loadData(): Promise<Array<Link>> {
    return Api.getLinks()
  }

  renderLoaded(links: Array<Link>) {
    const listItems = links.map((link: Link, key: number) =>
      <ListItem key={key}>
        <LinkComponent {... link} />
      </ListItem>
    )
    return (
      <div className={styles.container}>
        <List>
          {listItems}
        </List>
      </div>
    );
  }
}
