// @flow

import React, {
  Component,
} from 'react'
import TextField from 'material-ui/TextField'

import update from 'immutability-helper'
import type {
  LinkDescription,
  TransactionDraft,
} from 'api/entities'

type Props = {
  onDataChanged: (LinkDescription, TransactionDraft) => void,
}

type State = {
  label: string,
  url: string,
  description: string,
  hashtags: string,

  address: string,
  gas: string,
  gasPrice: string,
  nonce: string,
}

export default class CreateLinkStep extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      label: "",
      url: "",
      description: "",
      hashtags: "",

      address: "",
      gas: "",
      gasPrice: "",
      nonce: "",
    }
  }

  static FIELDS = [
    {name: 'label', hint: 'Name of Your Link', value: ''},
    {name: 'url', hint: 'Your Link', value: ''},
    {name: 'description', hint: 'Description of the link (not required)', value: ''},
    {name: 'hashtags', hint: 'Hashtags (not required)', value: ''},
    {name: 'address', hint: 'Your Ethereum Address', value: ''},
    {name: 'gas', hint: 'Amount of gas (not required)', value: ''},
    {name: 'gasPrice', hint: 'Gas Price (not required)', value: ''},
    {name: 'nonce', hint: 'Nonce', value: ''},
  ]

  handleUpdate = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    this.setState(state => update(state, {
      [target.name]: {
        $set: target.value,
      },
    }))
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state !== prevState) {
      const link: LinkDescription = {
        label: this.state.label,
        url: this.state.url,
        description: this.state.description,
        hashtags: this.state.hashtags.split('#').map(s => s.trim()).filter(s => s != ""),
      }
      const gas = parseInt(this.state.gas)
      const gasPrice = parseInt(this.state.gasPrice)
      const nonce = parseInt(this.state.nonce)
      const draft: TransactionDraft = {
        from: this.state.address,
        gas: isNaN(gas) ? undefined : gas,
        gasPrice: isNaN(gasPrice) ? undefined : gasPrice,
        nonce: isNaN(nonce) ? undefined : nonce,
      }
      this.props.onDataChanged(link, draft)
    }
  }

  render() {
    const self = this
    return (
      <div>
        {
          CreateLinkStep.FIELDS.map(({name, hint, value}, key) => (
            <TextField
              name={name}
              hintText={hint}
              fullWidth={true}
              onChange={self.handleUpdate}
              defaultValue={value}
              key={key}
            />
          ))
        }
      </div>
    )
  }
}
