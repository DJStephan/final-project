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
import { dialogContentstyle } from '../styles'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Delete extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      message: '[no message]',
      title: '[no title]'
    }
    this.textInput = React.createRef()
  }

  /* Opens "delete" dialoge box, and customizes message therein */
  handleOpen = () => {
    const {
      selectedFileName,
      selectedFolderName,
      inTrash,
      folderSelected
    } = this.props

    /* Make sure the dialog box isn't already open: */
    if (!this.state.open) {
      /* Initialize state variables: */
      let open = true
      let message = '[no message]'
      let title = '[no title]'
      /* If selected item isn't a folder, it's a file. Edit state variables accordingly: */
      if (!folderSelected) {
        title = inTrash ? 'Delete File' : 'Move File to Trash'
        message = `Are you sure you want to
          ${inTrash ? 'permanently delete' : 'trash'} "${selectedFileName}"?`
      }
      /* Check to make sure the root folder isn't selected.
       * If it is, load an error message and don't open the dialog box: */
      else if (this.props.selectedFolder === 1) {
        open = false
        this.props.loadError('Cannot delete the root folder!')
      }
      /* Check to make sure the trash folder isn't selected.
       * If it is, load an error message and don't open the dialog box: */
      else if (this.props.selectedFolder === 2) {
        open = false
        this.props.loadError('Cannot delete the trash folder!')
      }
      /* If neither the root nor trash folder is selected, then it must be a normal
       * folder. Edit the state variables accordingly: */
      else if (folderSelected) {
        title = inTrash ? 'Delete Folder' : 'Move Folder to Trash'
        message = `Are you sure you want to
          ${inTrash ? 'permanently delete' : 'trash'} "${selectedFolderName}"?`
      }
      /* Set the state values to the variables determined above: */
      this.setState({
        open,
        message,
        title
      })
    }
  }

  /* Closes "delete" dialoge box */
  handleClose = () => {
    this.setState({
      open: false
    })
  }

  /* Trashes or deletes selected file or folder */
  trashOrDelete = () => {
    this.props.trashOrDeleteFileOrFolder()
    this.handleClose()
  }

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
          <div style={dialogContentstyle}>
            <DialogContent style={{ textAlign: 'center' }}>
              <DialogContentText>{this.state.message}</DialogContentText>
            </DialogContent>
          </div>
          <DialogActions>
            <Button onClick={this.trashOrDelete} color='primary'>
              Confirm
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    )
  }
}

/* Id of selected file/folder must be included, or the trash/delete method won't work */
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
