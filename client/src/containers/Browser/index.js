import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { List, Paper } from '@material-ui/core'

import { downloadFile, getFiletreeFromDatabase } from '../../ducks/filetree.duck'
import { Folder } from '..'
import { File } from '../../components'

class Browser extends Component {
  render () {
    const { files, folders } = this.props

    return (
      <Paper>
        <List>
          {files.map(({ id, name }) =>
            <File key={id} name={name} />
          )}
          {folders.map(({ id, name, files }) =>
            <Folder key={id} name={name}>{
              files.map(({ id, name }, index) =>
                <File key={id} name={name} last={index === files.length - 1} />
              )}
            </Folder>
          )}
        </List>
      </Paper>
    )
  }
}

Browser.propTypes = {
  downloadFile: PropTypes.func.isRequired,
  getFiletreeFromDatabase: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.files,
  folders: state.folders
})

const mapDispatchToProps = dispatch => ({
  downloadFile: dispatch(downloadFile()),
  getFiletreeFromDatabase: dispatch(getFiletreeFromDatabase())
})

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
