import * as api from '../services/api'

const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const SELECT_FILE = 'SELECT_FILE'
const SELECT_FOLDER = 'SELECT_FOLDER'
const LOAD_ERROR = 'LOAD_ERROR'

const initialState = {
  files: [],
  folders: [],
  error: null,
  selectedFile: null,
  selectedFolder: 1, // root,
  folderSelected: true,
  activeFolder: 1 // root
}

export const filetreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILETREE_FROM_DATABASE:
      return {
        ...state,
        files: action.payload.files,
        folders: action.payload.folders,
        error: null
      }
    case SELECT_FILE:
      return {
        ...state,
        selectedFile:
          action.payload === state.selectedFile
            ? initialState.selectedFile
            : action.payload,
        selectedFolder: initialState.selectedFolder,
        folderSelected: false,
        error: null
      }
    case SELECT_FOLDER:
      return {
        ...state,
        selectedFile: initialState.selectedFile,
        selectedFolder:
          action.payload === state.selectedFolder
            ? initialState.selectedFolder
            : action.payload,
        activeFolder:
          action.payload === state.selectedFolder
            ? initialState.activeFolder
            : action.payload,
        folderSelected: true,
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

export const trashOrDeleteFileOrFolder = () => (dispatch, getState) => {
  const {
    folderSelected,
    selectedFile,
    selectedFolder,
    activeFolder
  } = getState()
  const inTrash = activeFolder === 2
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
