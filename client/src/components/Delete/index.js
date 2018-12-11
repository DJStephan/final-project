import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'

import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { trashOrDeleteFileOrFolder, loadError } from '../../ducks/filetree.duck'

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
    const {
      selectedFileName,
      selectedFolderName,
      inTrash,
      folderSelected
    } = this.props
    if (!this.state.open) {
      let open = true
      let message = 'Please select a file or folder'
      let title = 'Nothing Selected'
      if (!folderSelected) {
        title = inTrash ? 'Delete File' : 'Move File to Trash'
        message = `Are you sure you want to ${
          inTrash ? 'delete' : 'trash'
        } "${selectedFileName}"?`
      } else if (this.props.selectedFolder === 1) {
        open = false
        this.props.loadError('Cannot delete the root folder!')
      } else if (this.props.selectedFolder === 2) {
        open = false
        this.props.loadError('Cannot delete the trash folder!')
      } else if (folderSelected) {
        title = inTrash ? 'Delete Folder' : 'Move Folder to Trash'
        message = `Are you sure you want to ${
          inTrash ? 'delete' : 'trash'
        } "${selectedFolderName}"?`
      }
      this.setState({
        open,
        message,
        title
      })
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

  OkButton = () => (
    <Button onClick={this.handleClose} color='primary'>
      Ok
    </Button>
  )

  ConfirmationButtons = () => (
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button onClick={this.trashOrDelete} color='primary'>
        Yes
      </Button>
      <Button onClick={this.handleClose} color='primary'>
        No
      </Button>
    </DialogActions>
  )

  render () {
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
          <DialogTitle style={{ textAlign: 'center' }}>
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.message}</DialogContentText>
          </DialogContent>
          {this.state.title === 'Nothing Selected' ? (
            <this.OkButton />
          ) : (
            <this.ConfirmationButtons />
          )}
        </Dialog>
      </ListItem>
    )
  }
}

Delete.propTypes = {
  selectedFile: PropTypes.number,
  selectedFolder: PropTypes.number.isRequired,
  selectedFileName: PropTypes.string,
  selectedFolderName: PropTypes.string,
  folderSelected: PropTypes.bool.isRequired,
  inTrash: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  selectedFile: state.selectedFile,
  selectedFolder: state.selectedFolder,
  selectedFileName: state.selectedFileName,
  selectedFolderName: state.selectedFolderName,
  folderSelected: state.folderSelected,
  inTrash: state.inTrash
})

const mapDispatchToProps = {
  trashOrDeleteFileOrFolder,
  loadError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
