// @flow

import React from 'react'
import update from 'immutability-helper'

import ComponentWithData from 'components/ComponentWithData'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Api from 'api/MockClient'

import type {
  SignedTransaction,
  TransactionReceipt,
} from 'api/entities'

type Props = {
  transaction: SignedTransaction,
}

export default class LinkAddedStep extends ComponentWithData<Props, {}, TransactionReceipt, {}> {
  initCustomState() {
    return {}
  }

  loadData(): Promise<TransactionReceipt> {
    return Api.executeTransaction(this.props.transaction.toString())
  }

  renderLoaded(receipt: TransactionReceipt) {
    return (<div>
      Link Was Successfully Added
    </div>)
  }
}
