import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  Button,
  Slide
} from '@material-ui/core'
import FolderSkeleton from './FolderSkeleton'
import Error from '../Error'
import { moveFileOrFolder, fetchFileTreeFromDatabase } from '../../ducks/filetree.duck'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Move extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      selected: 0,
      error: false
    }
  }

  state = {
    open: false,
    selected: 0,
    folders: {},
    error: false
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
      open: false,
      error: false
    })
  }

  closeError = () => {
    this.setState({ error: false })
  }

  moveFileFolder = () => {
    console.log("Sup: " + this.props.selectedFolder + ", " + this.props.selectedFile)
    if (this.state.selected === 0) {
      console.log("No Folder")
      // No folder was selected to return error
      this.setState({ error: true })
    } else {
      console.log("Ya")
      if (this.props.selectedFile !== null) {
        console.log("File")
        this.props.moveFileOrFolder(
          this.props.selectedFile,
          this.state.selected
        )
      } else {
        console.log("Folder: " + this.props.selectedFolder + ', ' + this.state.selected)
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
              {this.props.folders.map(({ id, folderName, files, folders }) => (
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
          <Button onClick={this.moveFileFolder}>Confirm</Button>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Error
            open={this.state.error}
            handleClose={this.closeError}
            message='Select Folder to Move To'
          />
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
  fetchFileTreeFromDatabase
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Move)
