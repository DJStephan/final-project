import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import {fromEvent} from 'file-selector'
//import Typography from '@material-ui/core/Typography';

import { uploadFiles, createFolder } from '../../services/api'

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
    //temp hard code root get real folder to send to from state
    let parentFolderId = 1; //Hard coded (folder selected to be uploaded into)
    //Creating files in the database
    const createFiles = (accepted,rejected,data) => {
      if (rejected.length) {
        //do something with rejected files
        console.log("rejected")
        console.log(rejected)
      } else {
          for(let t of accepted) {
            data.append('files', t)
          }

          //send file(s) to DB
          uploadFiles(data)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        //}
      }
    }
    
    if(split.length > 2){
      folderName = split[1]
      //create folder in DB get back folder ID
      console.log(folderName)
      createFolder(parentFolderId, folderName)
        .then(response => {
          data.append('folderId', parentFolderId)
          createFiles(accepted,rejected,data)
        })
        .catch(err => console.log(err));
    }else{
      //create folders
      data.append('folderId', parentFolderId)
      createFiles(accepted,rejected,data)
    }
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    if(!this.state.open) {
      this.setState({ 
        ...this.state,  
        open: true 
      });
    }
  }

  handleClose = () => {
    this.setState({ 
      ...this.state,
      open: false 
    })
  }

  render() {
    return (
      <ListItem button onClick = {this.handleOpen}>
        {this.props.children}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Upload File</DialogTitle>
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
          <Button onClick={this.handleClose}>Close</Button>
        </Dialog>
      </ListItem>
    );
  }
}



export default Upload
