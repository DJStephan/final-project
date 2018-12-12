import React from 'react'
import PropTypes from 'prop-types'
import { File, Folder } from '../'

const Files = ({ files, inTrash, layer }) => (
  <div>
    {files.map(({ id, fileName }, index) => (
      <File
        inTrash={id === 2 || inTrash}
        key={id}
        id={id}
        name={fileName}
        last={index === files.length - 1}
        layer={layer}
      />
    ))}
  </div>
)

Files.propTypes = {
  files: PropTypes.array.isRequired,
  inTrash: PropTypes.bool.isRequired,
  layer: PropTypes.number.isRequired
}

const FileTree = ({ folders, layer, inTrash, openFolders, topLevelFiles }) => (
  <div>
    {folders.map(({ id, folderName, files, folders }) => (
      <Folder
        inTrash={id === 2 || inTrash}
        open={openFolders[id]}
        layer={layer}
        key={id}
        id={id}
        name={folderName}
      >
        <FileTree
          folders={folders}
          layer={layer + 1}
          inTrash={id === 2 || inTrash}
          openFolders={openFolders}
        />
        <Files files={files} inTrash={id === 2 || inTrash} layer={layer + 1} />
      </Folder>
    ))}
    {topLevelFiles && (
      <Files files={topLevelFiles} inTrash={inTrash} layer={layer} />
    )}
  </div>
)

FileTree.propTypes = {
  folders: PropTypes.array.isRequired,
  openFolders: PropTypes.object.isRequired,
  topLevelFiles: PropTypes.array,
  inTrash: PropTypes.bool.isRequired,
  layer: PropTypes.number.isRequired
}

export default FileTree
