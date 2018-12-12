import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import { Bird } from '../index'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}
class ButtonAppBar extends Component {
  state = {
    bird: false
  }
  handleToboToggle = () => {
    window.document.getElementsByTagName('BODY')[0].style.transition = 'all 1s'
    if (!this.state.bird) {
      window.document.body.style.background =
        'black url(northern-ice.jpg) bottom fixed'
    } else {
      window.document.body.style.background = 'white'
    }
    this.setState({ bird: !this.state.bird })
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              Tobo Drive
            </Typography>
            <Button color='inherit' onClick={this.handleToboToggle}>
              T
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Bird
            enter={this.state.bird}
            size={100}
            x='40vw'
            y='50vh'
            zIndex={2}
          />
        </div>
      </div>
    )
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
