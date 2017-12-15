import React from 'react'
import ReactDOM from 'react-dom'
import Theme from './theme'
import './index.css'
import MainPage from 'components/MainPage'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
    <MainPage/>
  </MuiThemeProvider>
), document.getElementById('root'))

registerServiceWorker()
