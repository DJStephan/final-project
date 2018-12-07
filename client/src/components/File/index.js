import React from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { MdInsertDriveFile } from 'react-icons/md'

import { selectFile } from '../../ducks/filetree.duck'

const File = ({ id, last, name, selectFile, selectedFile }) =>
  <ListItem
    button
    divider={last}
    selected={id === selectedFile}
    onClick={() => selectFile(id)}
  >
    <ListItemIcon>
      <MdInsertDriveFile />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>

File.propTypes = {
  // functions
  selectFile: PropTypes.func.isRequired,
  // required vars
  name: PropTypes.string.isRequired,
  // optional vars
  id: PropTypes.number,
  last: PropTypes.bool,
  selectedFile: PropTypes.number
}

const mapStateToProps = state => ({
  selectedFile: state.selectedFile
})

const mapDispatchToProps = dispatch => ({
  selectFile: id => dispatch(selectFile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(File)
