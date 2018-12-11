import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { List, Paper } from '@material-ui/core'

import {
  fetchFileTreeFromDatabase,
  selectFile,
  selectFolder
} from '../../ducks/filetree.duck'
import { FileTree } from '../../components'

class Browser extends Component {
  componentDidMount () {
    this.props.fetchFileTreeFromDatabase()
  }

  render () {
    const { folders, openFolders, files } = this.props
    return (
      <Paper>
        <List>
          <FileTree
            folders={folders}
            layer={0}
            inTrash={false}
            openFolders={openFolders}
            topLevelFiles={files}
          />
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
