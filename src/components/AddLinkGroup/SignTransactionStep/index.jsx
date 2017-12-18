// @flow

import React from 'react'
import update from 'immutability-helper'
import EthereumTx from 'ethereumjs-tx'

import ComponentWithData from 'components/ComponentWithData'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Api from 'api'

import styles from './styles.css'
import {
  type LinkDescription,
  type TransactionDraft,
  type SignedTransaction,
  type AddLinkTransaction,
  checkCorrectEthereumAddress,
} from 'api/entities'

type SignMethod = "manual" | "key"

type Props = {
  link: LinkDescription,
  draft: TransactionDraft,
  onTransactionSigned: SignedTransaction => void,
}

type State = {
  method: SignMethod,
  privateKey: string,
  signed: string,
}

export default class SignTransactionStep extends ComponentWithData<Props, State, AddLinkTransaction, {}> {
  initCustomState(): State {
    return {
      method: "manual",
      privateKey: "",
      signed: "",
    }
  }

  loadData(): Promise<AddLinkTransaction> {
    return Api.createLink(this.props.link, this.props.draft)
  }

  handleUpdate = (event: SyntheticEvent<*>, index: number, value: SignMethod) => {
    this.setCustomState(state => update(state, {
      method: {
        $set: value,
      },
    }))
  }

  handleStateChange = (event: SyntheticEvent<*>) => {
    const target = event.currentTarget
    this.setCustomState(state => update(state, {
      [target.name]: {
        $set: target.value,
      },
    }))
  }

  componentDidUpdate(prevProps: *, prevState: *) {
    if (this.state !== prevState) {
      let signed = "";
      switch(this.getCustomState().method) {
        case "manual":
          signed = this.getCustomState().signed
          break
        case "key":
          if (signed == "" && this.getCustomState().privateKey.length % 2 == 0) {
            const privateKey = Buffer.from(this.getCustomState().privateKey, 'hex')

            const tx = new EthereumTx(this.state.data)
            try {
              tx.sign(privateKey)
              const serialized = tx.serialize()
              signed = `0x${serialized.toString('hex')}`
            } catch (e) {
              console.log(e)
            }
          }
          break;
        }
        if (signed !== null && signed !== "") {
          this.props.onTransactionSigned(signed)
        }
    }
  }

  getSelectMethodField() {
    return (
      <div className={styles.selectMethod}>
          <span className={styles.middle}>{'Sign this transaction '}</span>
          <SelectField
            name="method"
            autoWidth={true}
            value={this.getCustomState().method}
            style={{
              width: 200,
              display: 'inline-block',
            }}
            className={styles.select}
            onChange={this.handleUpdate}
          >
            <MenuItem value={"manual"} primaryText="manually"/>
            <MenuItem value={"key"} primaryText="with private key"/>
          </SelectField>
        </div>
    )
  }

  getInputField(method: SignMethod) {
    switch (method) {
      case "manual":
        return (
          <TextField
            name="signed"
            fullWidth={true}
            multiLine={true}
            rows={4}
            hintText="Manually Signed Transaction"
            onChange={this.handleStateChange}
          />
        )
      default:
        return (
          <TextField
            name="privateKey"
            fullWidth={true}
            hintText="Your private Key"
            defaultValue=""
            onChange={this.handleStateChange}
          />
        )
    }
  }

  renderLoaded(transaction: AddLinkTransaction) {
    return (
      <div>
        <TextField
          defaultValue={JSON.stringify(transaction)}
          readOnly={true}
          multiLine={true}
          rows={4}
          fullWidth={true}
          hintText="Transaction For Adding Link"
        />
        {this.getSelectMethodField()}
        {this.getInputField(this.getCustomState().method)}
      </div>
    )
  }
}
