import React, { Component } from "react";
import connect from 'react-redux/es/connect/connect'
import { Dialog, DialogContent, DialogTitle, DialogActions, ListItem, Slide, TextField, Button } from '@material-ui/core'

import { createFolder } from '../../services/api'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewFolder extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      name: 'New Folder'
    }
    this.textInput = React.createRef();
  }

  state = {
    open: false,
    name: 'New Folder'
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
    this.props.createFolder(this.props.selectedFolder, this.state.name)
    this.setState({name: 'New Folder'})
    this.handleClose()
  }
  
  setName = (e) => {
    this.setState({name: e.target.value})
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
            <TextField ref={this.textInput}
              autoFocus
              margin="dense"
              id="name"
              label="New Folder"
              type="name"
              fullWidth
              onChange={this.setName}
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
const mapStateToProps = state => ({
  selectedFolder: state.selectedFolder
})
const mapDispatchToProps = dispatch => ({
  createFolder: (id,name) => createFolder(id, name)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewFolder)