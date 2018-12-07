import { deleteFile, deleteFolder, view } from '../services/api'

const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const SELECT_FILE = 'SELECT_FILE'
const UPLOAD_FILE = 'UPLOAD_FILE'
const LOAD_ERROR = 'LOAD_ERROR'
const MOVE_FILE = 'MOVE_FILE'
const CREATE_FOLDER = 'CREATE_FOLDER'
const SELECT_FOLDER = 'SELECT_FOLDER'
const UPLOAD_FOLDER = 'UPLOAD_FOLDER'
const DOWNLOAD_FOLDER = 'DOWNLOAD_FOLDER'
const MOVE_FOLDER = 'MOVE_FOLDER'
const DELETE_FOLDER = 'DELETE_FOLDER'

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
    default:
      return state
  }
}

export const getFiletreeFromDatabase = root => ({
  type: GET_FILETREE_FROM_DATABASE,
  payload: {
    files: root.files,
    folders: root.folders
  }
})

export const fetchFileTreeFromDatabase = () => dispatch => {
  view(1).then(response => dispatch(getFiletreeFromDatabase(response.root)))
}

const loadError = error => ({
  LOAD_ERROR,
  error
})

export const moveFolder = () => dispatch => {
  dispatch({
    type: MOVE_FOLDER
  })
}

export const selectFile = fileId => ({
  type: SELECT_FILE,
  payload: fileId
})

export const uploadFile = () => ({
  type: UPLOAD_FILE
})

export const moveFile = () => ({
  type: MOVE_FILE
})

export const deleteFileOrFolder = () => (dispatch, getState) => {
  const { folderSelected, selectedFile, selectedFolder } = getState()
  if (folderSelected) {
    deleteFolder(selectedFolder)
      .then(() => {
        dispatch(selectFolder(1))
        dispatch(fetchFileTreeFromDatabase())
      })
      .catch(e => dispatch(loadError(e.message)))
  } else {
    deleteFile(selectedFile)
      .then(() => {
        dispatch(selectFolder(selectedFolder))
        dispatch(fetchFileTreeFromDatabase())
      })
      .catch(e => dispatch(loadError(e.message)))
  }
}

export const selectFolder = folderId => ({
  type: SELECT_FOLDER,
  payload: folderId
})

export const uploadFolder = () => ({
  type: UPLOAD_FOLDER
})
