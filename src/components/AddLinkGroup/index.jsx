// @flow

import React, {
  Component,
} from 'react'

import update from 'immutability-helper'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import CreateLinkStep from './CreateLinkStep'
import SignTransactionStep from './SignTransactionStep/'
import LinkAddedStep from './LinkAddedStep'

import {
  type LinkDescription,
  type TransactionDraft,
  type SignedTransaction,
  checkCorrectEthereumAddress,
} from 'api/entities'

type State = {
  dialogOpen: boolean,
  step: Step,
  link: ?LinkDescription,
  draft: ?TransactionDraft,
  signed: ?string,
}

type Step = "create" | "sign" | "added"

export default class Page extends Component<{}, State> {
  state = this.initialState(false)

  initialState(open: boolean): State {
    return {
      dialogOpen: open,
      step: "create",
      link: null,
      draft: null,
      signed: null,
    };
  }

  handleOpen = () => {
    this.setState(this.initialState(true));
  };

  handleClose = () => {
    this.setState(this.initialState(false));
  };

  handleActionButtonClick = () => {
    const self = this
    const step = this.state.step
    if (step == "added") {
      this.handleClose()
      return
    }
    this.setState(state => update(state, {
      step: {
        $set: self.getNextStep(step),
      },
    }))
  }

  setTransactionData = (link: LinkDescription, draft: TransactionDraft) =>
    this.setState(state => update(state, {
      link: {
        $set: link,
      },
      draft: {
        $set: draft,
      },
    }))

  setSignedTransaction = (signed: SignedTransaction) =>
    this.setState(state => update(state, {
      signed: {
        $set: signed,
      },
    }))

  getNextStep(step: Step) {
    switch (step) {
      case "create":
        return "sign"
      case "sign":
      default:
        return "added"
    }
  }

  getContent(step: Step) {
    console.log(this.state)
    switch (step) {
      case "create":
        return <CreateLinkStep onDataChanged={this.setTransactionData}/>
      case "sign":
        if (this.state.link != null && this.state.draft != null) {
          return <SignTransactionStep
            link={this.state.link}
            draft={this.state.draft}
            onTransactionSigned={this.setSignedTransaction}
          />
        }
        return null
      case "added":
      default:
        if (this.state.signed != null) {
          return <LinkAddedStep transaction={this.state.signed}/>
        }
        return null
    }
  }

  getActionButtonText(step: Step) {
    switch (step) {
      case "create":
        return "Next"
      case "sign":
        return "Create Link"
      case "added":
        return "OK"
    }
  }

  checkCanProceed(state: State) {
    switch (state.step) {
      case "create":
        return state.link && state.link.label != "" && state.link.url != "" &&
               state.draft && checkCorrectEthereumAddress(state.draft.from)
      case "sign":
        return state.signed !== null
      case "added":
        return true
    }
    return false
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
        key={0}
      />,
      <FlatButton
        label={this.getActionButtonText(this.state.step)}
        onClick={this.handleActionButtonClick}
        disabled={!this.checkCanProceed(this.state)}
        key={1}
      />,
    ]
    return (
      <div>
        <Dialog
          title="Add New Link"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
        >
          {this.getContent(this.state.step)}
        </Dialog>
        <FloatingActionButton secondary={true} onClick={this.handleOpen} style={{
            position: 'fixed',
            right: '5%',
            bottom: '5%',
          }}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
