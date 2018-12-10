import * as api from '../services/api'

const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const SELECT_FILE = 'SELECT_FILE'
const SELECT_FOLDER = 'SELECT_FOLDER'
const LOAD_ERROR = 'LOAD_ERROR'

const initialState = {
  files: [],
  folders: [],
  openFolders: { 1: true, 2: false },
  folderParents: {},
  folderChildren: {},
  error: null,
  folderNames: {},
  fileNames: {},
  selectedFile: null,
  selectedFileName: null,
  selectedFolderName: 'root',
  selectedFolder: 1, // root,
  folderSelected: true
}

// adds folders that are not already in the openFolders hash map and sets them to be unopened
const populateClosedFolders = (
  openFolders,
  folderTree,
  folderParents,
  folderChildren,
  fileNames,
  folderNames,
  parentFolderId
) => {
  let n = folderTree.length
  for (let f = 0; f < n; f++) {
    const { id, folders, files, folderName } = folderTree[f]
    for (let i = 0; i < files.length; i++) {
      const { id, fileName } = files[i]
      fileNames[id] = fileName
    }
    folderNames[id] = folderName
    folderParents[id] = parentFolderId
    if (!folderChildren[parentFolderId]) {
      folderChildren[parentFolderId] = []
    }
    folderChildren[parentFolderId].push(id)
    if (!openFolders[id]) {
      openFolders[id] = false
    }
    if (folders.length) {
      populateClosedFolders(
        openFolders,
        folders,
        folderParents,
        folderChildren,
        fileNames,
        folderNames,
        id
      )
    }
  }
}

export const filetreeReducer = (state = initialState, action) => {
  const openFolders = { ...state.openFolders }
  switch (action.type) {
    case GET_FILETREE_FROM_DATABASE:
      const folderParents = {}
      const folderChildren = {}
      const fileNames = {}
      const folderNames = {}
      populateClosedFolders(
        openFolders,
        action.payload.folders,
        folderParents,
        folderChildren,
        fileNames,
        folderNames,
        1
      )
      return {
        ...state,
        files: action.payload.files,
        folders: action.payload.folders,
        folderParents,
        openFolders,
        folderChildren,
        fileNames,
        folderNames,
        error: null
      }
    case SELECT_FILE:
      return {
        ...state,
        selectedFile: action.payload,
        folderSelected: false,
        selectedFileName: state.fileNames[action.payload],
        error: null
      }
    case SELECT_FOLDER:
      let selectedFolder = action.payload
      const folderOpen = !openFolders[selectedFolder]
      if (!folderOpen) {
        const children = state.folderChildren[selectedFolder]
        if (children) {
          for (let c = 0; c < children.length; c++) {
            openFolders[children[c]] = false
          }
        }
      }
      openFolders[selectedFolder] = folderOpen
      const parentFolder = state.folderParents[selectedFolder]
      selectedFolder = folderOpen ? selectedFolder : parentFolder
      return {
        ...state,
        selectedFile: initialState.selectedFile,
        selectedFolder: selectedFolder,
        folderSelected: true,
        selectedFolderName: state.folderNames[selectedFolder],
        openFolders,
        error: null
      } // GOTTA FIX FOR FOLDERS WITHIN FOLDERS
    case LOAD_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

// getFiletreeFromDatabase is being deprecated
export const getFiletreeFromDatabase = root => ({
  type: GET_FILETREE_FROM_DATABASE,
  payload: {
    files: root.files,
    folders: root.folders
  }
})

const requestRefreshMapper = (action, dispatch, ...args) => {
  action(...args)
    .then(() => dispatch(fetchFileTreeFromDatabase()))
    .catch(e => dispatch(loadError(e.message)))
}

const loadError = error => ({
  type: LOAD_ERROR,
  error
})

export const fetchFileTreeFromDatabase = (folder = 1) => dispatch => {
  api
    .view(folder)
    .then(response => dispatch(getFiletreeFromDatabase(response.root)))
    .catch(e => dispatch(loadError(e.message)))
}

export const uploadFiles = data => dispatch => {
  requestRefreshMapper(api.uploadFiles, dispatch, data)
}

export const uploadFolder = (folders, dataLists) => dispatch => {
  const folderPromises = folders.map(({ folderName, parentId }) =>
    api.createFolder(parentId, folderName)
  )
  Promise.all(folderPromises)
    .then(responses => {
      for (let i = 0; i < responses.length; i++) {
        const data = dataLists[i]
        const folderId = responses[i].id
        data.append('folderId', folderId)
        dispatch(uploadFiles(data))
      }
    })
    .catch(e => dispatch(loadError(e.message)))
}

export const createFolder = (id, name) => dispatch => {
  requestRefreshMapper(api.createFolder, dispatch, id, name)
}

export const moveFileOrFolder = (id, destinationId) => (dispatch, getState) => {
  console.log(id, destinationId)
  const { folderSelected } = getState()
  if (folderSelected) {
    requestRefreshMapper(api.moveFolder, dispatch, id, destinationId)
  } else {
    requestRefreshMapper(api.moveFile, dispatch, id, destinationId)
  }
}

const deleteOrTrashFile = (
  modifyFunction,
  dispatch,
  selectedFile,
  selectedFolder
) => {
  modifyFunction(selectedFile)
    .then(() => {
      dispatch(selectFolder(selectedFolder))
      dispatch(fetchFileTreeFromDatabase())
    })
    .catch(e => dispatch(loadError(e.message)))
}

const deleteOrTrashFolder = (modifyFunction, dispatch, selectedFolder) => {
  modifyFunction(selectedFolder)
    .then(() => {
      dispatch(selectFolder(1))
      dispatch(fetchFileTreeFromDatabase())
    })
    .catch(e => {
      console.log(e.message, LOAD_ERROR)
      dispatch(loadError(e.message))
    })
}

const isInTrash = (folder, folderParents) => {
  if (folder === 1) {
    return false
  } else if (folder === 2) {
    return true
  } else {
    return isInTrash(folderParents[folder], folderParents)
  }
}

export const trashOrDeleteFileOrFolder = () => (dispatch, getState) => {
  const {
    folderSelected,
    selectedFile,
    selectedFolder,
    folderParents
  } = getState()
  const inTrash = isInTrash(selectedFolder, folderParents)
  if (folderSelected && !inTrash) {
    deleteOrTrashFolder(api.trashFolder, dispatch, selectedFolder)
  } else if (folderSelected && inTrash) {
    deleteOrTrashFolder(api.deleteFolder, dispatch, selectedFolder)
  } else if (!folderSelected && !inTrash) {
    deleteOrTrashFile(api.trashFile, dispatch, selectedFile, selectedFolder)
  } else if (!folderSelected && inTrash) {
    deleteOrTrashFile(api.deleteFile, dispatch, selectedFile, selectedFolder)
  }
}

export const selectFolder = folderId => ({
  type: SELECT_FOLDER,
  payload: folderId
})

export const selectFile = fileId => ({
  type: SELECT_FILE,
  payload: fileId
})
