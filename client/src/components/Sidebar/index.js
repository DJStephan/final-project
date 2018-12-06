import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MdCreateNewFolder, MdDelete, MdFileDownload, MdFileUpload } from 'react-icons/md'
import Upload from '../Upload'
import { downloadFile, createFolder } from '../../services/api'

function download() {
  //Change the base64 into array buffer
  function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  //Create file(blob) and download (brower defined)
  function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }

  downloadFile(1)
    .then(response => {console.log(response); return response;})
    .then(response => {
      console.log(response.file.data)
      console.log(base64ToArrayBuffer(response.file.data))
      if(response.result.statusCode == 200) {
        //Create file and ask for download
        saveByteArray(response.file.fileName, base64ToArrayBuffer(response.file.data));
      } else {
        console.log(response.result.message);
      }
    })
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