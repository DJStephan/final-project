import React, { Component, Fragment } from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import { Browser } from '..'
// import { Sidebar } from '../../components'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

class Page extends Component {
  render () {
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Sidebar />
            <Browser />
          </div> */}
          <Browser />
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

export default Page
