import React from 'react'
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
        {openFolders[id] && (
          <FileTree
            folders={folders}
            layer={layer + 1}
            trashed={id === 2 || inTrash}
            openFolders={openFolders}
          />
        )}
        <Files files={files} inTrash={inTrash} layer={layer + 1} />
      </Folder>
    ))}
    {topLevelFiles && (
      <Files files={topLevelFiles} inTrash={inTrash} layer={layer} />
    )}
  </div>
)

export default FileTree
