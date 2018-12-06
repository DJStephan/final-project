import React, { Component } from "react";
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
//import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import { createFolder } from '../../services/api'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewFolder extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    if(!this.state.open) {
      this.setState({ 
        open: true 
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false 
    })
  }

  createNewFolder(folderName, id) {
    this.handleClose()
    createFolder(id, folderName)
      .then(response => console.log(response))
      .catch(err => console.log(err));
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
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="File Name"
              type="name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createNewFolder} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  }
}



export default NewFolder
