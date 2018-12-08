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
      name: '[fileName/folderName]',
      type: '[selected element]'
    }
    this.textInput = React.createRef()
  }

  state = {
    open: false,
    name: '[fileName/folderName]',
    type: '[selected element]'
  }

  handleOpen = () => {
    // CLEAN THIS UP LATER
    if (!this.state.open) {
      this.setState({
        // might consider removing this and adding it below
        open: true // that way, things won't open until you select something
      })
      if (this.props.selectedFile) {
        // CAN'T ACCESS STUFF IN ROOT FOLDER
        this.props.folders.filter(folder => {
          folder.files.filter(file => {
            if (file.id === this.props.selectedFile) {
              this.setState({
                name: file.fileName,
                type: 'File'
              })
            }
          })
        })
      } else {
        this.props.folders.filter(folder => {
          if (folder.id === this.props.selectedFolder) {
            this.setState({
              name: folder.folderName,
              type: 'Folder'
            })
          }
        })
      } // maybe do this with ternary operators?
    } // also maybe add something for when nothing is selected?
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
          {/* Should we center everything? It might look better... */}
          <DialogTitle>Delete {this.state.type}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{this.state.name}"?
            </DialogContentText>
          </DialogContent>
          {/* Maybe we should re-order these buttons as well... */}
          <DialogActions>
            <Button onClick={this.trashOrDelete} color='primary'>
              Yes
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders,
  selectedFile: state.selectedFile,
  selectedFolder: state.selectedFolder
})

const mapDispatchToProps = dispatch => ({
  trashOrDeleteFileOrFolder: () => dispatch(trashOrDeleteFileOrFolder())
})
// const trashOrDeleteFileOrFolder = () => (dispatch, getState) => {
// const moveFileOrFolder = (id, destinationId) => (dispatch, getState) => {
// moveFileOrFolder: (id, destinationId, which) => moveFileOrFolder(id, destinationId, which)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete)
