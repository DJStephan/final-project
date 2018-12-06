import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon'
import {fromEvent} from 'file-selector'
//import Typography from '@material-ui/core/Typography';

import { uploadFile, uploadFiles, createFolder } from '../../services/api'

class Upload extends Component {
  constructor() {
    super()
    this.state = { 
      files: [],
      open: false
    }
  }

  //Creating files in the database
  createFiles(accepted,rejected,data) {
    if (rejected.length) {
      //do something with rejected files
      console.log("rejected")
      console.log(rejected)
    } else {
      if(accepted.length === 1) {
        data.append("file", accepted[0])
        uploadFile(data)
          .catch(err => console.log(err));
      } else if(accepted.length > 1) {
        // let data = new FormData();
        data.append("file", accepted);
        /*for (let i = 0; i < accepted.length; i++) {
          let file = accepted[i];
          //data.append("file" + i, file, file.name);
          data.append("file", file, file.name);
        }*/
        //send file(s) to DB
        uploadFiles(data)
          .catch(err => console.log(err));
      }
      //If there are no files don't do anything
    }
  }

  onDrop(accepted, rejected) {
    let split = accepted[0].path.split('/')
    let folderName
    let data = new FormData();
    //temp hard code root get real folder to send to from state
    let parentFolderId = 1; //Hard coded (folder selected to be uploaded into)
    if(split.length > 2){
      folderName = split[1]
      //create folder in DB get back folder ID
      createFolder(parentFolderId, folderName)
        .then(response => {
          data.append('folderId', parentFolderId)
          this.createFiles(accepted,rejected,data)
        })
        .catch(err => console.log(err));
      console.log(folderName)
    }else{
      //create folders
      data.append('folderId', parentFolderId)
      this.createFiles(accepted,rejected,data)
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
    //const { classes } = this.props;
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
