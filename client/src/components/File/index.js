import React from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import { MdDelete, MdInsertDriveFile } from 'react-icons/md'

const File = ({ last, name }) =>
  <ListItem button divider={last}>
    <ListItemIcon>
      <MdInsertDriveFile />
    </ListItemIcon>
    <ListItemText primary={name} />
    <ListItemSecondaryAction>
      <IconButton>
        <MdDelete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>

File.propTypes = {
  name: PropTypes.string.isRequired
}

export default File
