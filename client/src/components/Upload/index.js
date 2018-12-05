import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon'
import {fromEvent} from 'file-selector'
import Typography from '@material-ui/core/Typography';

import { uploadFile, uploadFolder, createFolder } from '../../services/api'

class Upload extends Component {
  constructor() {
    super()
    this.state = { 
      files: [],
      open: false
    }
  }

  onDrop(accepted, rejected) {
    let split = accepted[0].path.split('/')
    let folderName
    let data = new FormData();
    console.log(accepted[0].path);
    if(split.length > 2){
      folderName = split[1]
      //create folder in DB get back folder ID
      let folderId = 1 //temp hard code
      data.append('folderId', folderId)
      console.log(folderName)
    }else{
      let folderId = 1 //temp hard code root get real folder to send to from state

      data.append('folderId', folderId) 
    }
    if (rejected.length) {
      //do something with rejected files
    } else {
      // let data = new FormData();
      for (let i = 0; i < accepted.length; i++) {
        let file = accepted[i];
        data.append("file" + i, file, file.name);
      }
      //send file(s) to DB
      for(let key of data.keys()){
      }
      console.log('folderId: ' + data.get('folderId'))
      console.log('file0: ' + data.get('file0').name )

      uploadFile(data.get('file0'));
    }
  }
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ 
      ...this.state,  
      open: true 
    });
  }

  handleClose = () => {
    this.setState({ 
      ...this.state,
      open: false 
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick = {this.handleOpen}><Icon><MdFileUpload/></Icon></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Upload File</DialogTitle>
          {/*<form method="POST" encType="multipart/form-data" action="http://localhost:8080/upload/file">
            <table>
              <tr><td>File to upload:</td><td><input type="file" name="file" /></td></tr>
              <tr><td></td><td><input type="submit" value="Upload" /></td></tr>
            </table>
    </form>*/}
          <DialogContent>
            <DialogContentText>
              Drag files here of click to browse
            </DialogContentText>
            <ReactDropzone 
              getDataTransferItems={evt => fromEvent(evt)}
              onDrop={this.onDrop}
            >
            </ReactDropzone>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}



export default Upload
