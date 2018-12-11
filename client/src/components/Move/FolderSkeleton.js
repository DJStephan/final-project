import React, { Component, Fragment } from 'react'
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
  MdExpandMore,
  MdDelete,
  MdDeleteForever,
  MdHome
} from 'react-icons/md'

class FolderSkeleton extends Component {
  state = {
    open: false
  }

  selectedSkeletonFolder = () => {
    this.props.selectSkeletonFolder(this.props.id)
    this.setState({open: !this.state.open})
  }

  render () {
    const { children, id, name, selectedFolder } = this.props
    const selected = id === selectedFolder

    return (
      <Fragment>
        <ListItem
          button
          selected={selected}
          onClick={this.selectedSkeletonFolder}
        >
          <ListItemIcon>
            {id=== 1? <MdHome /> : id === 2? this.state.open ? <MdDeleteForever /> : <MdDelete /> : this.state.open ? <MdFolderOpen /> : <MdFolder />}
          </ListItemIcon>
          <ListItemText primary={name} />
          {this.state.open ? <MdExpandLess /> : <MdExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            {children}
          </List>
        </Collapse>
      </Fragment>
    )
  }
}

FolderSkeleton.propTypes = {
  children: PropTypes.array,
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  selectedFolder: PropTypes.number.isRequired,
  selectSkeletonFolder: PropTypes.func.isRequired
}

export default FolderSkeleton
