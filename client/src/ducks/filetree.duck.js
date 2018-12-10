import * as api from '../services/api'

const LOAD_FILETREE = 'LOAD_FILETREE'
const SELECT_FILE = 'SELECT_FILE'
const SELECT_FOLDER = 'SELECT_FOLDER'
const LOAD_ERROR = 'LOAD_ERROR'
const LOAD_SUCCESS = 'LOAD_SUCCESS'

const initialState = {
  files: [],
  folders: [],
  openFolders: { 1: true, 2: false },
  folderParents: {},
  folderChildren: {},
  error: null,
  success: null,
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
    case LOAD_FILETREE:
      const folderParents = {}
      const folderChildren = {}
      const fileNames = {}
      const folderNames = {}
      const files = action.payload.files
      for (let i = 0; i < files.length; i++) {
        const { id, fileName } = files[i]
        fileNames[id] = fileName
      }
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
        error: null,
        success: null
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
        error: null,
        success: null
      } // GOTTA FIX FOR FOLDERS WITHIN FOLDERS
    case LOAD_ERROR:
      return {
        ...state,
        error: action.error,
        success: null
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.success
      }
    default:
      return state
  }
}

// getFiletreeFromDatabase is being deprecated
const loadFiletree = root => ({
  type: LOAD_FILETREE,
  payload: {
    files: root.files,
    folders: root.folders
  }
})

export const fetchFileTreeFromDatabase = (
  message = null,
  folder = 1
) => dispatch => {
  api
    .view(folder)
    .then(response => dispatch(loadFiletree(response.root)))
    .then(() => dispatch(loadSuccess(message)))
    .catch(e => dispatch(loadError(e.message)))
}

const requestRefreshMapper = (action, dispatch, message, ...args) => {
  action(...args)
    .then(() => dispatch(fetchFileTreeFromDatabase(message)))
    .catch(e => dispatch(loadError(e.message)))
}

const loadError = error => ({
  type: LOAD_ERROR,
  error
})

export const loadSuccess = success => ({
  type: LOAD_SUCCESS,
  success
})

export const uploadFiles = data => dispatch => {
  requestRefreshMapper(
    api.uploadFiles,
    dispatch,
    'Files uploaded successfully',
    data
  )
}

export const createFolder = (id, name) => dispatch => {
  requestRefreshMapper(
    api.createFolder,
    dispatch,
    `Folder [${name}] created successfully`,
    id,
    name
  )
}

export const moveFileOrFolder = (id, destinationId) => (dispatch, getState) => {
  const { folderSelected, folderNames, fileNames } = getState()
  if (folderSelected) {
    requestRefreshMapper(
      api.moveFolder,
      dispatch,
      `${folderNames[id]} moved to ${folderNames[destinationId]} successfully`,
      id,
      destinationId
    )
  } else {
    requestRefreshMapper(
      api.moveFile,
      dispatch,
      `${fileNames[id]} moved to ${folderNames[destinationId]} successfully`,
      id,
      destinationId
    )
  }
}

const deleteOrTrashFile = (
  modifyFunction,
  dispatch,
  message,
  selectedFile,
  selectedFolder
) => {
  modifyFunction(selectedFile)
    .then(() => {
      dispatch(selectFolder(selectedFolder))
      dispatch(fetchFileTreeFromDatabase(message))
    })
    .catch(e => dispatch(loadError(e.message)))
}

const deleteOrTrashFolder = (
  modifyFunction,
  dispatch,
  message,
  selectedFolder
) => {
  modifyFunction(selectedFolder)
    .then(() => {
      dispatch(selectFolder(1))
      dispatch(fetchFileTreeFromDatabase(message))
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
    folderParents,
    folderNames,
    fileNames
  } = getState()
  const inTrash = isInTrash(selectedFolder, folderParents)
  if (folderSelected && !inTrash) {
    deleteOrTrashFolder(
      api.trashFolder,
      dispatch,
      `${folderNames[selectedFolder]} successfully moved to trash`,
      selectedFolder
    )
  } else if (folderSelected && inTrash) {
    deleteOrTrashFolder(
      api.deleteFolder,
      dispatch,
      `${folderNames[selectedFolder]} deleted permanently`,
      selectedFolder
    )
  } else if (!folderSelected && !inTrash) {
    deleteOrTrashFile(
      api.trashFile,
      dispatch,
      `${fileNames[selectedFile]} successfully moved to trash`,
      selectedFile,
      selectedFolder
    )
  } else if (!folderSelected && inTrash) {
    deleteOrTrashFile(
      api.deleteFile,
      dispatch,
      `${fileNames[selectedFile]} deleted permanently`,
      selectedFile,
      selectedFolder
    )
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
