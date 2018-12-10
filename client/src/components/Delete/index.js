import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { trashOrDeleteFileOrFolder } from '../../ducks/filetree.duck'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Delete extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      message: 'Please select a file or folder',
      title: 'Nothing Selected'
    }
    this.textInput = React.createRef()
  }

  state = {
    open: false,
    message: 'Please select a file or folder',
    title: 'Nothing Selected'
  }

  handleOpen = () => {
    if (!this.state.open) {
      this.setState({
        open: true
      })
      if (this.props.selectedFile) {
        this.props.folders.filter(folder => {
          folder.files.filter(file => {
            if (file.id === this.props.selectedFile) {
              this.setState({
                message: `Are you sure you want to delete "${file.fileName}"?`,
                title: 'Delete File'
              })
            }
          })
        })
        if (this.props.selectedFolder === 1) {
          this.props.files.filter(file => {
            if (file.id === this.props.selectedFile) {
              this.setState({
                message: `Are you sure you want to delete "${file.fileName}"?`,
                title: 'Delete File'
              })
            }
          })
        }
      } else {
        this.props.folders.filter(folder => {
          if (folder.id === this.props.selectedFolder) {
            this.setState({
              message: `Are you sure you want to delete "${folder.folderName}"?`,
              title: 'Delete Folder'
            })
          }
        })
      }
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  trashOrDelete = () => {
    this.props.trashOrDeleteFileOrFolder()
    this.handleClose()
  }

  render () {
    const handleButtons = () => {
      if (this.state.title === 'Nothing Selected') {
        return (
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Ok
            </Button>
          </DialogActions>
        )
      } else {
        return (
          <DialogActions>
            <Button onClick={this.trashOrDelete} color='primary'>
              Yes
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              No
            </Button>
          </DialogActions>
        )
      }
    }

    return (
      <ListItem button onClick={this.handleOpen}>
        {this.props.children}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          scroll='paper'
        >
          <DialogTitle>{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.message}</DialogContentText>
          </DialogContent>
          {handleButtons()}
        </Dialog>
      </ListItem>
    )
  }
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders,
  selectedFile: state.selectedFile,
  selectedFolder: state.selectedFolder
})

const mapDispatchToProps = dispatch => ({
  trashOrDeleteFileOrFolder: () => dispatch(trashOrDeleteFileOrFolder())
})

export default connect(mapStateToProps, mapDispatchToProps)(Delete)