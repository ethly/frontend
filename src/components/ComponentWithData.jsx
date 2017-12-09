// @flow

import React, {
  Component,
  type Node,
} from 'react'
import update from 'immutability-helper'
import CircularProgress from 'material-ui/CircularProgress'
import Logger from 'utils/Logger'

type StateEnum = 'LOADING' | 'LOADED' | 'ERROR'
type InternalState<T, E> = {
  state: ?StateEnum,
  data: ?T,
  error: ?E,
}

// Component that can be used for rendering data from API
// It can be in 3 states - loading, loaded, error
// Current state is determined by the state of data loading
export default class ComponentWithData<Props, T, E>
  extends Component<Props, InternalState<T, E>> {
  initState(): InternalState<T, E> {
    return {
      state: null,
      data: null,
      error: null,
    }
  }

  _constructState(
    oldState: InternalState<T, E>,
    loadingState: StateEnum,
    data: ?T,
    error: ?E
  ): InternalState<T, E> {
    return update(oldState, {
      state: {
        $set: loadingState,
      },
      data: {
        $set: data,
      },
      error: {
        $set: error,
      },
    })
  }

  // Returns promise that loads required data
  loadData(): Promise<T> {
    return Promise.reject(new Error('Not Implemented'))
  }

  fetchData(): void {
    const self = this
    this.loadData()
      .then(data => self.setState(state => self._constructState(
        state,
        'LOADED',
        data,
        null,
      )))
      .catch(error => self.setState(state => self._constructState(
        state,
        'ERROR',
        null,
        error
      )))
  }

  reloadData(): void {
    const self = this
    this.setState(state => self._constructState(
      this.initState(),
      'LOADING',
      null,
      null
    ))
    this.fetchData()
  }

  componentWillMount() {
    this.reloadData()
  }

  // Override this to show progress indicator
  renderLoading(): ?Node {
    return <CircularProgress />
  }

  // Override this to render component with loaded data
  renderLoaded(loaded: T): ?Node  {
    return null
  }

  // Override this to render component in case of error
  renderError(error: E): ?Node {
    Logger.error(error)
    return null
  }

  render(): ?Node {
    switch (this.state.state) {
      case 'LOADING':
        return this.renderLoading()
      case 'LOADED':
        return this.state.data ? this.renderLoaded(this.state.data) : null
      case 'ERROR':
        return this.state.error ? this.renderError(this.state.error) : null
      default:
        return null
    }
  }
}
