const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const SELECT_FILE = 'SELECT_FILE'
const UPLOAD_FILE = 'UPLOAD_FILE'
const DOWNLOAD_FILE = 'DOWNLOAD_FILE'
const MOVE_FILE = 'MOVE_FILE'
const DELETE_FILE = 'DELETE_FILE'
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
  selectedFolder: 1, // root
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
        selectedFile: action.payload === state.selectedFile ? initialState.selectedFile : action.payload,
        selectedFolder: initialState.selectedFolder
      }
    case SELECT_FOLDER:
      return {
        ...state,
        selectedFile: initialState.selectedFile,
        selectedFolder: action.payload === state.selectedFolder ? initialState.selectedFolder : action.payload,
        activeFolder: action.payload === state.selectedFolder ? initialState.activeFolder : action.payload
      }
    default:
      return state
  }
}

const getFiletreeFromDatabase = (root) => ({
  type: GET_FILETREE_FROM_DATABASE,
  payload: {
    files: root.files,
    folders: root.folders
  }
})

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

const deleteFile = () => ({
  type: DELETE_FILE
})

const createFolder = () => ({
  type: CREATE_FOLDER
})

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

const moveFolder = () => ({
  type: MOVE_FOLDER
})

const deleteFolder = () => ({
  type: DELETE_FOLDER
})

export {
  createFolder,
  deleteFile,
  deleteFolder,
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
