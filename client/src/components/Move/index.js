import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import {
  moveFileOrFolder,
  fetchFileTreeFromDatabase,
  loadError
} from '../../ducks/filetree.duck'
import FolderSkeleton from './FolderSkeleton'
import { dialogContentstyle } from '../styles'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Move extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      selected: 0,
      folders: {}
    }
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
      //If file is selected move that
      if (this.props.selectedFile !== null) {
        this.props.moveFileOrFolder(
          this.props.selectedFile,
          this.state.selected
        )
      } else {
        //else move the folder selected
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
    //Recursively display subfolders
    const showFolders = folders =>
      folders.map(({ id, folderName, folders }) => (
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
          <div className = 'dialogContent'>
            <DialogContent>
              <FolderSkeleton
                key={1}
                id={1}
                name='root'
                selectedFolder={this.state.selected}
                selectSkeletonFolder={this.selectFolder}
              >
                {this.props.folders.filter(({id}) => id !== 2 ).map(({ id, folderName, folders }) => (
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
          </div>
          <DialogActions>
            <Button onClick={this.moveFileFolder} color="primary">
              Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    )
  }
}

Move.propTypes = {
  moveFileOrFolder: PropTypes.func.isRequired,
  fetchFileTreeFromDatabase: PropTypes.func.isRequired,
  loadError: PropTypes.func.isRequired,
  folders: PropTypes.array,
  selectedFolder: PropTypes.number,
  selectedFile: PropTypes.number,
  children: PropTypes.array
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