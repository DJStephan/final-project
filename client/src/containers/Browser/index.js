import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { List, Paper } from '@material-ui/core'

import { view } from '../../services/api'
import { getFiletreeFromDatabase } from '../../ducks/filetree.duck'
import { File, Folder } from '../../components'

class Browser extends Component {
  componentDidMount() {
    view(1).then(response => this.props.getFiletreeFromDatabase(response.root))
  }

  render () {
    const { files, folders } = this.props

    const showFolders = folders =>
      folders.map(({id, folderName, files, folders}) =>
        <Folder
          key={id}
          id={id}
          name={folderName}
        >
          {files.map(({ id, fileName }, index) =>
            <File
              key={id}
              id={id}
              name={fileName}
              last={index === files.length - 1}
            />
          )}
          {showFolders(folders)} 
        </Folder>
    )


    return (
      <Paper>
        <List>
          {folders.map(({ id, folderName, files, folders }) =>
            <Folder
              key={id}
              id={id}
              name={folderName}
            >
              {files.map(({ id, fileName }, index) =>
                <File
                  key={id}
                  id={id}
                  name={fileName}
                  last={index === files.length - 1}
                />
              )}
              {showFolders(folders)} 
            </Folder>
          )}
          {files.map(({ id, fileName }) =>
            <File
              key={id}
              id={id}
              name={fileName}
            />
          )}
        </List>
      </Paper>
    )
  }
}

Browser.propTypes = {
  getFiletreeFromDatabase: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders
})

const mapDispatchToProps = dispatch => ({
  getFiletreeFromDatabase: config => dispatch(getFiletreeFromDatabase(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
