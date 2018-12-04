import React, { Component, Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {
  MdFolder,
  MdFolderOpen,
  MdExpandLess,
  MdExpandMore
} from 'react-icons/md'

class Folder extends Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  render () {
    const { open } = this.state
    const { children, name } = this.props

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            {open ? <MdFolderOpen /> : <MdFolder />}
          </ListItemIcon>
          <ListItemText primary={name} />
          {open ? <MdExpandLess /> : <MdExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {children}
          </List>
        </Collapse>
      </Fragment>
    )
  }
}

Folder.propTypes = {
  children: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  folders: state.folders
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
