import React, { Fragment } from 'react'
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

import { selectFolder, activeFolder } from '../../ducks/filetree.duck'

const Folder = ({ children, id, name, selectFolder, selectedFolder, activeFolder }) => {
  const selected = id === selectedFolder // consider deleting
  const open = id === activeFolder

  return (
    <Fragment>
      <ListItem
        button
        selected={selected}
        onClick={() => selectFolder(id)}
      >
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

Folder.propTypes = {
  // required vars
  children: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  // optional vars
  id: PropTypes.number,
  selectedFolder: PropTypes.number,
  activeFolder: PropTypes.number
}

const mapStateToProps = state => ({
  selectedFolder: state.selectedFolder,
  activeFolder: state.activeFolder
})

const mapDispatchToProps = dispatch => ({
  selectFolder: id => dispatch(selectFolder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
