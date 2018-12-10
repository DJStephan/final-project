import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  Button,
  Slide
} from '@material-ui/core'
import FolderSkeleton from './FolderSkeleton'
import { moveFileOrFolder, fetchFileTreeFromDatabase, loadError } from '../../ducks/filetree.duck'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Move extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      selected: 0
    }
  }

  state = {
    open: false,
    selected: 0,
    folders: {}
  }

  handleOpen = () => {
    if (!this.state.open) {
      this.setState({
        ...this.state,
        open: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  moveFileFolder = () => {
    if (this.state.selected === 0) {
      // No folder was selected so return error
      this.props.loadError("Select Folder to Move To")
    } else {
      if (this.props.selectedFile !== null) {
        this.props.moveFileOrFolder(
          this.props.selectedFile,
          this.state.selected
        )
      } else {
        this.props.moveFileOrFolder(
          this.props.selectedFolder,
          this.state.selected
        )
      }
      this.handleClose()
    }
  }

  selectFolder = id => {
    this.setState({ selected: id })
  }

  render () {
    const showFolders = folders =>
      folders.map(({ id, folderName, files, folders }) => (
        <FolderSkeleton
          key={id}
          id={id}
          name={folderName}
          selectedFolder={this.state.selected}
          selectSkeletonFolder={this.selectFolder}
        >
          {showFolders(folders)}
        </FolderSkeleton>
      ))

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
          <DialogTitle>Select Folder</DialogTitle>
          <DialogContent>
            <FolderSkeleton
              key={1}
              id={1}
              name='root'
              selectedFolder={this.state.selected}
              selectSkeletonFolder={this.selectFolder}
            >
              {this.props.folders.filter(({id}) => id !== 2 ).map(({ id, folderName, files, folders }) => (
                <FolderSkeleton
                  key={id}
                  id={id}
                  name={folderName}
                  selectedFolder={this.state.selected}
                  selectSkeletonFolder={this.selectFolder}
                >
                  {showFolders(folders)}
                </FolderSkeleton>
              ))}
            </FolderSkeleton>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.moveFileFolder} color="primary">
              Confirm
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

const mapDispatchToProps = ({
  moveFileOrFolder,
  fetchFileTreeFromDatabase,
  loadError
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Move)