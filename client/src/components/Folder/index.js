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
  MdExpandMore,
  MdDelete,
  MdDeleteForever
} from 'react-icons/md'

import { selectFolder } from '../../ducks/filetree.duck'

class Folder extends Component {
  state = {
    open: false
  }

  render () {
    const { children, id, name, selectFolder, selectedFolder, layer } = this.props
    const selected = id === selectedFolder

    return (
      <Fragment>
        <ListItem
          button
          selected={selected}
          onClick={() => {selectFolder(id); this.setState({open: !this.state.open})}}
          style={{paddingLeft: (layer * 30 + 10) + 'px'}}
        >
          <ListItemIcon>
            {id === 2? this.state.open ? <MdDeleteForever /> : <MdDelete /> : this.state.open ? <MdFolderOpen /> : <MdFolder />}
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

Folder.propTypes = {
  // required vars
  children: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  // optional vars
  id: PropTypes.number,
  selectedFolder: PropTypes.number,
  layer: PropTypes.number
}

const mapStateToProps = state => ({
  selectedFolder: state.selectedFolder
})

const mapDispatchToProps = dispatch => ({
  selectFolder: id => dispatch(selectFolder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
