import React, { Component, Fragment } from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import { Browser } from '..'
import { Upload } from '../../components'

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
          <Upload/>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

export default Page
