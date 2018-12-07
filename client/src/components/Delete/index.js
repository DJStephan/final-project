import React, { Component } from "react"
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { createFolder, deleteFile, deleteFolder } from '../../services/api'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Delete extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      name: '[fileName/folderName]',
      type: '[selected element]'
    }
    this.textInput = React.createRef();
  }

  state = {
    open: false,
    name: '[fileName/folderName]',
    type: '[selected element]'
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

  createNewFolder = () => {
    let id = 1
    createFolder(id, this.state.name)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    this.handleClose()
    this.setState({name: 'New Folder'})
  }

  deleteSelected = () => {
      //
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
        {/* Should we center everything? */}
          <DialogTitle>Delete {this.state.type}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {this.state.name}
            </DialogContentText>
          </DialogContent>
          {/* Maybe we should center or re-order these buttons... */}
          <DialogActions>
            <Button onClick={this.createNewFolder} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  }
}

export default Delete