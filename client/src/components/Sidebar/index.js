import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MdCreateNewFolder, MdDelete, MdFileDownload, MdFileUpload } from 'react-icons/md'
import Upload from '../Upload'
import { downloadFile, createFolder } from '../../services/api'

function download() {
  downloadFile(1)
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

function createNewFolder() {
  createFolder(1, "newFolder")
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

const Sidebar = () =>
  <Drawer variant="permanent">
    <List>
      <ListItem button onClick={download}>
        <ListItemIcon>
          <MdFileDownload />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </ListItem>
      <Upload>
        <ListItemIcon>
          <MdFileUpload />
        </ListItemIcon>
        <ListItemText primary="Upload" />
      </Upload>
      <ListItem button onClick={createNewFolder}>
        <ListItemIcon>
          <MdCreateNewFolder />
        </ListItemIcon>
        <ListItemText primary="Create Folder" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MdDelete />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </ListItem>
    </List>
  </Drawer>

export default Sidebar