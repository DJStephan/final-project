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
    const showFolders = (folders, layer, inTrash) =>
      folders.map(({ id, folderName, files, folders }) => {
        let trashed = (id === 2)
        return (
        <Folder inTrash={trashed? true : inTrash} open={openFolders[id]} layer={layer} key={id} id={id} name={folderName}>
          {openFolders[id] && showFolders(folders, layer + 1, trashed? true : inTrash)}
          {files.map(({ id, fileName }, index) => (
            <File
              inTrash={trashed? true : inTrash}
              key={id}
              id={id}
              name={fileName}
              last={index === files.length - 1}
              layer={layer + 1}
            />
          ))}
        </Folder>
      )})

    return (
      <Paper>
        <List>
          {showFolders(folders,0,false)}
          {this.props.files.map(({ id, fileName }, index) => (
            <File
              open={openFolders[id]}
              key={id}
              id={id}
              name={fileName}
              last={index === this.props.files.length - 1}
              layer={0}
            />
          ))}
        </List>
      </Paper>
    )
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
