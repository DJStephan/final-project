import { deleteFile, deleteFolder, view } from '../services/api'

const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const SELECT_FILE = 'SELECT_FILE'
const UPLOAD_FILE = 'UPLOAD_FILE'
const DOWNLOAD_FILE = 'DOWNLOAD_FILE'
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
  selectedFile: null,
  selectedFolder: 1, // root,
  folderSelected: true,
  activeFolder: 1 // root
}

const filetreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILETREE_FROM_DATABASE:
      return {
        ...state,
        files: action.payload.files,
        folders: action.payload.folders
      }
    case SELECT_FILE:
      return {
        ...state,
        selectedFile:
          action.payload === state.selectedFile
            ? initialState.selectedFile
            : action.payload,
        selectedFolder: initialState.selectedFolder,
        folderSelected: false
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
        folderSelected: true
      } // GOTTA FIX FOR FOLDERS WITHIN FOLDERS
    default:
      return state
  }
}

const getFiletreeFromDatabase = root => ({
  type: GET_FILETREE_FROM_DATABASE,
  payload: {
    files: root.files,
    folders: root.folders
  }
})



const fetchFileTreeFromDatabase = () => dispatch => {
  view(1).then(response => dispatch(getFiletreeFromDatabase(response.root)))
}

const selectFile = fileId => ({
  type: SELECT_FILE,
  payload: fileId
})

const uploadFile = () => ({
  type: UPLOAD_FILE
})

const downloadFile = () => ({
  type: DOWNLOAD_FILE
})

const moveFile = () => ({
  type: MOVE_FILE
})

const deleteFileOrFolder = () => (dispatch, getState) => {
  const { folderSelected, selectedFile, selectedFolder } = getState()
  if (folderSelected) {
    
  } else {
    deleteFile
      .then(console.log)
      .then(() => {
        
        dispatch(selectFolder(selectedFolder))
      })
  }
}

const moveFolder = () => ({
  type: MOVE_FOLDER
})

const fetchFileTreeFromDatabase = () => dispatch => {
const createFolder = () => dispatch => {
  dispatch({ type: CREATE_FOLDER})

}
  
  

const selectFolder = folderId => ({
  type: SELECT_FOLDER,
  payload: folderId
})

const uploadFolder = () => ({
  type: UPLOAD_FOLDER
})

const downloadFolder = () => ({
  type: DOWNLOAD_FOLDER
})

export {
  createFolder,
  deleteFileOrFolder,
  downloadFile,
  downloadFolder,
  filetreeReducer,
  getFiletreeFromDatabase,
  moveFile,
  moveFolder,
  selectFile,
  selectFolder,
  uploadFile,
  uploadFolder
}
