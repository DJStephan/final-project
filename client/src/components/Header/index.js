import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'

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
    console.log('bird')
    this.setState({bird: !this.state.bird})
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              Tobo Drive
            </Typography>
            <Button color="inherit" onClick={this.handleToboToggle}>T</Button>
          </Toolbar>
        </AppBar>
        <Bird enter={this.state.bird} size={100} x='50vw' y='50vh' zIndex={2}/>
      </div>
    )
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
