import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { Drawer, List, ListItemIcon, ListItemText } from '@material-ui/core'
import {
  MdCreateNewFolder,
  MdDelete,
  MdFileDownload,
  MdFileUpload,
  MdOpenWith
} from 'react-icons/md'

import Upload from '../Upload'
import NewFolder from '../NewFolder'
import Delete from '../Delete'
import Move from '../Move'
import Download from '../Download'
import withWidth from '@material-ui/core/withWidth'

class Sidebar extends Component {
  render () {
    return (
      <Drawer className='sidebar' variant='persistent' anchor='left' open>
        <List className='sidebar'>
          <Download>
            <ListItemIcon>
              <MdFileDownload />
            </ListItemIcon>
            <ListItemText primary='Download' />
          </Download>
          <Upload>
            <ListItemIcon>
              <MdFileUpload />
            </ListItemIcon>
            <ListItemText primary='Upload' />
          </Upload>
          <Move>
            <ListItemIcon>
              <MdOpenWith />
            </ListItemIcon>
            <ListItemText primary='Move' />
          </Move>
          <NewFolder>
            <ListItemIcon>
              <MdCreateNewFolder />
            </ListItemIcon>
            <ListItemText primary='Create Folder' />
          </NewFolder>
          <Delete>
            <ListItemIcon>
              <MdDelete />
            </ListItemIcon>
            <ListItemText primary='Delete' />
          </Delete>
        </List>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders,
  selectedFolder: state.selectedFolder
})

export default connect(mapStateToProps)(withWidth()(Sidebar))
