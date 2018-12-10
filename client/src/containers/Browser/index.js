import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { List, Paper } from '@material-ui/core'

import {
  fetchFileTreeFromDatabase,
  selectFile,
  selectFolder
} from '../../ducks/filetree.duck'
import { File, Folder } from '../../components'

class Browser extends Component {
  componentDidMount () {
    this.props.fetchFileTreeFromDatabase()
  }

  render () {
    const { folders, openFolders } = this.props
    const showFolders = folders =>
      folders.map(({ id, folderName, files, folders }) => (
        <Folder key={id} id={id} name={folderName}>
          {files.map(({ id, fileName }, index) => (
            <File
              key={id}
              id={id}
              name={fileName}
              last={index === files.length - 1}
            />
          ))}
          {openFolders[id] && showFolders(folders)}
        </Folder>
      ))

    return (
      <Paper>
        <List>{showFolders(folders)}</List>
      </Paper>
    ) // problem w/ files showing up where they're supposed to
  }
}

Browser.propTypes = {
  fetchFileTreeFromDatabase: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders,
  openFolders: state.openFolders
})

const mapDispatchToProps = {
  fetchFileTreeFromDatabase,
  selectFile,
  selectFolder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser)
