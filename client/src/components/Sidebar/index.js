import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MdCreateNewFolder, MdDelete, MdFileDownload, MdFileUpload, MdOpenWith } from 'react-icons/md'

import Upload from '../Upload'
import NewFolder from '../NewFolder'
import Delete from '../Delete'
import Move from '../Move'
import { downloadFile } from '../../services/api'
import Download from '../Download'

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
      if(response.result.statusCode === 200) {
        //Create file and ask for download
        saveByteArray(response.file.fileName, base64ToArrayBuffer(response.file.data));
      } else {
        console.log(response.result.message);
      }
    })
    .catch(err => console.log(err))
}


class Sidebar extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  
  render () {
    return(
      <Drawer variant="permanent">
        <List>
          <Download>
            <ListItemIcon>
              <MdFileDownload />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </Download>
          <Upload>
            <ListItemIcon>
              <MdFileUpload />
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </Upload>
          <Move>
            <ListItemIcon>
              <MdOpenWith />
            </ListItemIcon>
            <ListItemText primary="Move" />
          </Move>
          <NewFolder>
            <ListItemIcon>
              <MdCreateNewFolder />
            </ListItemIcon>
            <ListItemText primary="Create Folder" />
          </NewFolder>
          <Delete>
            <ListItemIcon>
              <MdDelete />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </Delete>
        </List>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders,
  selectedFolder: state.selectedFolder
})

export default connect(mapStateToProps)(Sidebar)