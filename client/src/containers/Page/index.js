import React, { Component, Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import { Browser } from '..'
import { Sidebar } from '../../components'
import Header from '../../components/Header'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

class Page extends Component {
  state = {
    sidebarVisible: true
  }

  componentDidUpdate() {
    if(this.props.success !== null) {
      this.props.enqueueSnackbar(this.props.success, { variant: 'success' });
    }
    if(this.props.error !== null) {
      this.props.enqueueSnackbar(this.props.error, { variant: 'error' });
    }
  }

  toggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    })
  }

  render () {
    // const 

    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Sidebar visible={this.state.sidebarVisible} />
          <div style={{marginLeft: (this.state.sidebarVisible? '210px' : '0px')}}>
            <Header indented={!this.state.sidebarVisible} toggleButton={this.toggleSidebar} />
            <Browser indented={!this.state.sidebarVisible} />
          </div>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

Page.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  success: state.success,
  error: state.error
})
export default connect(
  mapStateToProps
)(Page)