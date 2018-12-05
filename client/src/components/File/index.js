import React from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { MdInsertDriveFile } from 'react-icons/md'

import { updateSelectedId } from '../../ducks/filetree.duck'

const File = ({ id, last, name, selectedId, updateSelectedId }) =>
  <ListItem
    button
    divider={last}
    selected={id === selectedId}
    onClick={() => updateSelectedId(id)}
  >
    <ListItemIcon>
      <MdInsertDriveFile />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>

File.propTypes = {
  // functions
  updateSelectedId: PropTypes.func.isRequired,
  // required vars
  name: PropTypes.string.isRequired,
  // optional vars
  id: PropTypes.number,
  last: PropTypes.bool,
  selectedId: PropTypes.number
}

const mapStateToProps = state => ({
  selectedId: state.selectedId
})

const mapDispatchToProps = dispatch => ({
  updateSelectedId: id => dispatch(updateSelectedId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(File)
