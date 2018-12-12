import * as api from '../services/api'

const LOAD_FILETREE = 'LOAD_FILETREE'
const SELECT_FILE = 'SELECT_FILE'
const SELECT_FOLDER = 'SELECT_FOLDER'
const NON_TOGGLE_SELECT_FOLDER = 'NON_TOGGLE_SELECT_FOLDER'
const LOAD_ERROR = 'LOAD_ERROR'
const LOAD_SUCCESS = 'LOAD_SUCCESS'

const initialState = {
  files: [],
  folders: [],
  openFolders: { 1: true, 2: false },
  folderParents: {},
  fileParents: {},
  inTrash: false,
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

// Since selected file and folder are ids AND because the action buttons on the interface are separate
// from the files and folders, lots of information about relationships between files and folders
// needs to be stored, and it is stored in openFolders, folderParents, fileParents, folderNames,
// and fileNames.  All of these are populated on each reload of the view.
const addNeededRelationships = (
  openFolders,
  folderTreeFolders,
  folderParents,
  fileParents,
  fileNames,
  folderNames,
  parentFolderId
) => {
  let n = folderTreeFolders.length
  for (let f = 0; f < n; f++) {
    const { id: folderId, folders, files, folderName } = folderTreeFolders[f]
    for (let i = 0; i < files.length; i++) {
      const { id: fileId, fileName } = files[i]
      fileNames[fileId] = fileName
      fileParents[fileId] = folderId
    }
    folderNames[folderId] = folderName
    folderParents[folderId] = parentFolderId

    // initialize folders to not be open if they have not been added to state before
    if (!openFolders.hasOwnProperty(folderId)) {
      openFolders[folderId] = false
    }
    if (folders.length) {
      addNeededRelationships(
        openFolders,
        folders,
        folderParents,
        fileParents,
        fileNames,
        folderNames,
        folderId
      )
    }
  }
}

export const filetreeReducer = (state = initialState, action) => {
  const openFolders = { ...state.openFolders }
  let selectedFolder
  switch (action.type) {
    case LOAD_FILETREE:
      // all relationship maps are reset upon each load of the file tree
      const folderParents = {}
      const fileParents = {}
      const fileNames = {}
      const folderNames = {}
      const files = action.payload.files
      for (let i = 0; i < files.length; i++) {
        const { id, fileName } = files[i]
        fileNames[id] = fileName
        fileParents[id] = 1
      }

      action.payload.folders.sort(f => (f.id === 2 ? -1 : 1)) // TRASH ALWAYS RISES TO THE TOP!
      addNeededRelationships(
        openFolders,
        action.payload.folders,
        folderParents,
        fileParents,
        fileNames,
        folderNames,
        1
      )
      return {
        ...state,
        files: action.payload.files,
        folders: action.payload.folders,
        folderParents,
        fileParents,
        openFolders,
        fileNames,
        folderNames,
        error: null
      }
    case SELECT_FILE:
      const fileParent = state.fileParents[action.payload]
      return {
        ...state,
        selectedFile: action.payload,
        folderSelected: false,
        selectedFolder: fileParent,
        inTrash: isInTrash(fileParent, state.folderParents),
        selectedFileName: state.fileNames[action.payload],
        error: null,
        success: null
      }
    case NON_TOGGLE_SELECT_FOLDER: // a folder is selected without toggling the open state.  This is for after moving / deleting
      selectedFolder = action.payload
      return {
        ...state,
        folderSelected: true,
        selectedFolder: selectedFolder,
        selectedFile: null,
        inTrash: isInTrash(selectedFolder, state.folderParents),
        selectedFolderName: state.folderNames[selectedFolder]
      }
    case SELECT_FOLDER:
      // Selects a folder.  If the folder clicked was open, it is closed and its parent is selected.
      // If the folder was closed, it is open and selected.
      selectedFolder = action.payload
      const folderOpen = !openFolders[selectedFolder]
      openFolders[selectedFolder] = folderOpen
      const parentFolder = state.folderParents[selectedFolder]
      selectedFolder = folderOpen ? selectedFolder : parentFolder
      return {
        ...state,
        selectedFile: null,
        selectedFolder: selectedFolder,
        folderSelected: true,
        selectedFolderName: state.folderNames[selectedFolder],
        inTrash: isInTrash(selectedFolder, state.folderParents),
        openFolders,
        error: null,
        success: null
      }
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
    .then(() => {
      if (message) {
        dispatch(loadSuccess(message))
      }
    })
    .catch(e => dispatch(loadError(e.message)))
}

// performs a basic api request that mutates the file tree,
// and then fetches the entire file tree from the api
// Also, dispatches a success or failure message when done.
const requestRefreshMapper = (action, dispatch, message, ...args) => {
  action(...args)
    .then(() => dispatch(fetchFileTreeFromDatabase(message)))
    .catch(e => dispatch(loadError(e.message)))
}

export const loadError = error => ({
  type: LOAD_ERROR,
  error
})

export const loadSuccess = success => ({
  type: LOAD_SUCCESS,
  success
})

export const uploadFiles = data => dispatch => {
  requestRefreshMapper(api.uploadFiles, dispatch, null, data)
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

// only one move function needs to be exposed to components, because the state knows if
// a file or folder is selected
export const moveFileOrFolder = (id, destinationId) => (dispatch, getState) => {
  const { folderSelected, folderNames, fileNames, fileParents } = getState()
  if (folderSelected) {
    dispatch(selectFolder(id))
    requestRefreshMapper(
      api.moveFolder,
      dispatch,
      `${folderNames[id]} moved to ${folderNames[destinationId]} successfully`,
      id,
      destinationId
    )
  } else {
    dispatch(nonToggleSelectFolder(fileParents[id]))
    requestRefreshMapper(
      api.moveFile,
      dispatch,
      `${fileNames[id]} moved to ${folderNames[destinationId]} successfully`,
      id,
      destinationId
    )
  }
}

// a recursive (moves recursively up in the file tree) function that determines if a given file
// or folder is in the trash
const isInTrash = (folder, folderParents) => {
  if (folder === 1) {
    return false
  } else if (folder === 2) {
    return true
  } else {
    return isInTrash(folderParents[folder], folderParents)
  }
}

// This function does what its name suggests.  Since the state knows if a file or folder is selected,
// and if it is in the trash or not, it is only necessary to expose one function for the four
// underlying api calls to external components
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
  const parentFolder = folderParents[selectedFolder]
  if (folderSelected && !inTrash) {
    dispatch(selectFolder(selectedFolder))
    callAndDispatchDeleteOrTrashFolderOrFile(
      api.trashFolder,
      dispatch,
      `${folderNames[selectedFolder]} successfully moved to trash`,
      selectedFolder,
      parentFolder
    )
  } else if (folderSelected && inTrash) {
    dispatch(selectFolder(selectedFolder))
    callAndDispatchDeleteOrTrashFolderOrFile(
      api.deleteFolder,
      dispatch,
      `${folderNames[selectedFolder]} deleted permanently`,
      selectedFolder,
      parentFolder
    )
  } else if (!folderSelected && !inTrash) {
    callAndDispatchDeleteOrTrashFolderOrFile(
      api.trashFile,
      dispatch,
      `${fileNames[selectedFile]} successfully moved to trash`,
      selectedFile,
      selectedFolder
    )
  } else if (!folderSelected && inTrash) {
    callAndDispatchDeleteOrTrashFolderOrFile(
      api.deleteFile,
      dispatch,
      `${fileNames[selectedFile]} deleted permanently`,
      selectedFile,
      selectedFolder
    )
  }
}

// a helper function that calls the api delete or trash method,
// and then refreshes the view and dispatches a message
const callAndDispatchDeleteOrTrashFolderOrFile = (
  modifyFunction,
  dispatch,
  message,
  selected,
  parentFolder
) => {
  modifyFunction(selected)
    .then(() => {
      dispatch(nonToggleSelectFolder(parentFolder))
      dispatch(fetchFileTreeFromDatabase(message))
    })
    .catch(e => dispatch(loadError(e.message)))
}

export const selectFolder = folderId => ({
  type: SELECT_FOLDER,
  payload: folderId
})

export const selectFile = fileId => ({
  type: SELECT_FILE,
  payload: fileId
})

const nonToggleSelectFolder = folderId => ({
  type: NON_TOGGLE_SELECT_FOLDER,
  payload: folderId
})
