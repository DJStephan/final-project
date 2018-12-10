import React, { Component } from "react";
import connect from 'react-redux/es/connect/connect'
import ReactDropzone from "react-dropzone";
import { Dialog, DialogContent, DialogContentText, DialogTitle, ListItem, Button } from '@material-ui/core'
import {fromEvent} from 'file-selector'
import Slide from '@material-ui/core/Slide';

import {
  //uploadFiles,
  createFolder } from '../../services/api'

import {
  fetchFileTreeFromDatabase,
  uploadFiles,
  loadSuccess
} from '../../ducks/filetree.duck'

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


  onDrop = (accepted, rejected) => {
    let split = accepted[0].path.split('/')
    let folderName
    let parentFolderId = 1;
    if(this.props.selectedFolder !== null) {
      parentFolderId = this.props.selectedFolder
    }

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
        this.props.uploadFiles(data)
        //  .then(response => console.log(response))
        //  .catch(err => console.log(err));
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
            this.props.uploadFiles(data)
          }
        })
        .catch(err => console.log(err));
    }
    
    if(split.length > 2){
      //upload folders
      folderName = split[1]
      //create folder in DB get back folder ID
      console.log(folderName)
      createFolders(accepted, rejected, parentFolderId, folderName, 0)
    }else{
      //upload files
      let data = new FormData();
      data.append('folderId', parentFolderId)
      createFiles(accepted,rejected,data)
    }
    this.handleClose();
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
const mapStateToProps = state => ({
  selectedFolder: state.selectedFolder
})
const mapDispatchToProps = ({
  fetchFileTreeFromDatabase,
  uploadFiles,
  loadSuccess
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)