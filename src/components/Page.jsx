// @flow

import React, {
  Component,
  type Node,
} from 'react'
import Paper from 'material-ui/Paper'

import Header from 'components/Header'
import SearchBox from 'components/SearchBox'
import SortBox from 'components/SortBox'

export default class Page extends Component<{
  children?: Node,
}> {
  static PAGE_STYLE = {
    position: 'absolute',
    minHeight: '90%',
    width: '80%',
    marginTop: '5%',
    marginLeft: '10%',
    textAlign: 'center',
  }

  render() {
    return (
      <Paper style={Page.PAGE_STYLE}>
        <Header />
        <SearchBox />
        <SortBox />
        {this.props.children}
      </Paper>
    )
  }
}
