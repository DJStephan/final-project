const GET_FILETREE_FROM_DATABASE = 'GET_FILETREE_FROM_DATABASE'
const UPLOAD_FILE = 'UPLOAD_FILE'
const DOWNLOAD_FILE = 'DOWNLOAD_FILE'
const MOVE_FILE = 'MOVE_FILE'
const DELETE_FILE = 'DELETE_FILE'
const CREATE_FOLDER = 'CREATE_FOLDER'
const UPLOAD_FOLDER = 'UPLOAD_FOLDER'
const DOWNLOAD_FOLDER = 'DOWNLOAD_FOLDER'
const MOVE_FOLDER = 'MOVE_FOLDER'
const DELETE_FOLDER = 'DELETE_FOLDER'
const SELECT_FILE = 'SELECT_FILE'
const SELECT_FOLDER = 'SELECT_FOLDER'

const initialState = {
  files: [
    {
      id: 1,
      name: "Test file 1"
    },
    {
      id: 4,
      name: "Test file 4"
    }
  ],
  folders: [
    {
      id: 3,
      name: "Test folder 1",
      files: [
        {
          id: 2,
          name: "Test file 2"
        },
        {
          id: 3,
          name: "Test file 3"
        }
      ]
    },
    {
      id: 4,
      name: "Test folder 2",
      files: [
        {
          id: 5,
          name: "Test file 5"
        },
        {
          id: 6,
          name: "Test file 6"
        }
      ]
    }
  ],
  selectedFile: null,
  selectedFolder: null //root
}

const filetreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILETREE_FROM_DATABASE:
      return {
        ...state,
        files: action.files,
        folders: action.folders
      }
    case SELECT_FILE:
      return {
        ...state,
        selectedFile: action.payload
      }
    case SELECT_FOLDER:
      return {
        ...state,
        selectedFolder: action.payload
      }
    default:
      return state
  }
}

const getFiletreeFromDatabase = () => ({
  type: GET_FILETREE_FROM_DATABASE,
  files: initialState.files,
  folders: initialState.folders
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

const selectFolder = (folderId) => ({
  type: SELECT_FOLDER,
  payload: folderId
})

const selectFile = (fileId) => ({
  type: SELECT_FILE,
  payload: fileId
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
  uploadFile,
  uploadFolder,
  selectFolder,
  selectFile
}
