import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { List, Paper } from '@material-ui/core'

import { view } from '../../services/api'
import { downloadFile, getFiletreeFromDatabase } from '../../ducks/filetree.duck'
import { File, Folder } from '../../components'

class Browser extends Component {
  componentDidMount() {
    // this.props.getFiletreeFromDatabase()
    view(1)
      .then(t => {console.log(t); return t;})
      .then(response => this.props.getFiletreeFromDatabase(response.root))
  }

  render () {
    const { files, folders } = this.props

    return (
      <Paper>
        <List>
          {folders.map(({ id, folderName, files }) =>
            <Folder
              key={id}
              id={id}
              name={folderName}
            >
              {
                files.map(({ id, fileName }, index) =>
                  <File
                    key={id}
                    id={id}
                    name={fileName}
                    last={index === files.length - 1}
                  />
                )}
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
  downloadFile: PropTypes.func.isRequired,
  getFiletreeFromDatabase: PropTypes.func.isRequired,
  // getFiletree: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders
})

const mapDispatchToProps = dispatch => ({
  downloadFile: () => dispatch(downloadFile()),
  getFiletreeFromDatabase: config => dispatch(getFiletreeFromDatabase(config)),
  // getFiletree: () => dispatch(getFiletree()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
