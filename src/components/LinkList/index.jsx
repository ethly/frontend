// @flow

import React from 'react'
import {List, ListItem} from 'material-ui/List'

import ComponentWithData from 'components/ComponentWithData'
import type { LinkDescription } from 'api/entities'
import Api from 'api'

import styles from './styles.css'

import LinkComponent from './Link'

export default class Version extends ComponentWithData<{}, {}, Array<LinkDescription>, {}> {
  initCustomState(): {} {
    return {}
  }

  loadData(): Promise<Array<LinkDescription>> {
    return Api.getAllLinks()
  }

  renderLoaded(links: Array<LinkDescription>) {
    const listItems = links.map((link: LinkDescription, key: number) =>
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
