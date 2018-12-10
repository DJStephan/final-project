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
    const showFolders = (folders, layer) =>
      folders.map(({ id, folderName, files, folders }) => (
        <Folder open={openFolders[id]} layer={layer} key={id} id={id} name={folderName}>
          {openFolders[id] && showFolders(folders, layer + 1)}
          {files.map(({ id, fileName }, index) => (
            <File
              key={id}
              id={id}
              name={fileName}
              last={index === files.length - 1}
              layer={layer + 1}
            />
          ))}
        </Folder>
      ))

    return (
      <Paper>
        <List>
          {showFolders(folders,0)}
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
