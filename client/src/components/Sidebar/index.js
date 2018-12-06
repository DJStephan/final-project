import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MdCreateNewFolder, MdDelete, MdFileDownload, MdFileUpload } from 'react-icons/md'
import Upload from '../Upload'

const Sidebar = () =>
  <Drawer variant="permanent">
    <List>
      <ListItem button>
        <ListItemIcon>
          <MdFileDownload />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MdFileUpload />
        </ListItemIcon>
        <ListItemText primary="Upload" />
        <Upload />
      </ListItem>
      <ListItem button>
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