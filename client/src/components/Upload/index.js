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
import Slide from '@material-ui/core/Slide';

import { uploadFiles, createFolder } from '../../services/api'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
      }
    }

    const createFolders = (accepted, rejected, parentFolderId, folderName, index) => {
      createFolder(parentFolderId, folderName)
        .then(response => {
          let folderId = response.id;
          let data = new FormData()
          data.append('folderId', folderId)
          if (rejected.length) {
            //do something with rejected files
            console.log("rejected")
            console.log(rejected)
          } else {
            let files = accepted.filter(f => f.path.split('/').length <= 3 + index)
            let folders = accepted.filter(f => f.path.split('/').length > 3 + index)
            for(let f of files) {
              data.append('files', f)
            }
            let subFolder = {};
            for(let f of folders) {
              let sub = f.path.split('/')[index+2]
              if(subFolder.hasOwnProperty(sub)) {
                subFolder[sub].push(f)
              } else {
                subFolder[sub] = [f];
              }
            }
            for(let k in subFolder) {
              createFolders(subFolder[k], [], folderId, k, index + 1)
            }
    
            //send file(s) to DB
            uploadFiles(data)
              .then(response => console.log(response))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
    
    if(split.length > 2){
      folderName = split[1]
      //create folder in DB get back folder ID
      console.log(folderName)
      createFolders(accepted, rejected, parentFolderId, folderName, 0)
    }else{
      //create folders
      let data = new FormData();
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
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          scroll="paper"
        >
          <DialogTitle>Upload File</DialogTitle>
          <DialogContent>
            <ReactDropzone 
              className='dropzone'
              getDataTransferItems={evt => fromEvent(evt)}
              onDrop={this.onDrop}
            >
              <DialogContentText>
                Drag files or click to browse
              </DialogContentText>
            </ReactDropzone>
          </DialogContent>
          <Button onClick={this.handleClose}>Close</Button>
        </Dialog>
      </ListItem>
    );
  }
}



export default Upload