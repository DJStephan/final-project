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

  render () {
    const { children, id, name, selectFolder, selectedFolder, layer, open } = this.props
    const selected = id === selectedFolder

    return (
      <Fragment>
        <ListItem
          button
          selected={selected}
          onClick={() => {selectFolder(id)}}
          style={{paddingLeft: (layer * 30 + 10) + 'px', backgroundColor: (selected? 'rgb(104, 133, 228)' : open? 'rgb(200, 200, 250)' : 'white')}}
        >
          <ListItemIcon>
            {id === 2? open ? <MdDeleteForever /> : <MdDelete /> : open ? <MdFolderOpen /> : <MdFolder />}
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
