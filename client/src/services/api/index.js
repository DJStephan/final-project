import axios from 'axios'

const localPath = 'http://localhost:8080/'

// this function is necessary because dto responses from the server come in two formats:
// 1) A top level result DTO which has a status code and message
// 2) Another DTO with some kind of data, as well as a child result DTO with a status code and message
// If there was an expected server error, it will be rethrown by this function.
// If it was unexpected, it will be thrown by the callers below
const returnWrappedOrUnwrapped = ({ data }) => {
  if (data.hasOwnProperty('result')) {
    const { statusCode, message } = data.result
    if (statusCode !== 200) {
      throw new Error(message)
    }
  } else {
    const { statusCode, message } = data
    if (statusCode !== 200) {
      throw new Error(message)
    }
  }
  return data
}

const axiosGet = (url, params) => {
  return axios
    .get(localPath + url, { params: params })
    .then(returnWrappedOrUnwrapped)
}
const axiosDelete = (url, params) => {
  return axios
    .delete(localPath + url, { params: params })
    .then(returnWrappedOrUnwrapped)
}
const axiosPost = (url, data, config) => {
  return axios
    .post(localPath + url, data, config)
    .then(returnWrappedOrUnwrapped)
}
const axiosPatch = (url, params) => {
  return axios
    .patch(localPath + url, { params: params })
    .then(returnWrappedOrUnwrapped)
}

export const uploadFiles = data =>
  axiosPost('upload/files', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const downloadFile = fileId => axiosGet(`download/files/${fileId}`, {})
export const downloadFolder = folderId =>
  axiosGet(`download/folders/${folderId}`, {})

export const deleteFile = fileId =>
  axiosDelete(`edit/delete/file/${fileId}`, {})
export const deleteFolder = folderId =>
  axiosDelete(`edit/delete/folder/${folderId}`, {})

export const trashFile = fileId => axiosPatch(`edit/trash/file/${fileId}`, {})
export const trashFolder = folderId =>
  axiosPatch(`edit/trash/folder/${folderId}`, {})

export const createFolder = (parentFolderId, folderName) =>
  axiosPost(`edit/create/${folderName}?parentFolderId=${parentFolderId}`, {})

export const moveFile = (fileId, locationFolderId) =>
  axiosPatch(`edit/move/file/${fileId}/${locationFolderId}`, {})
export const moveFolder = (folderId, locationFolderId) =>
  axiosPatch(`edit/move/folder/${folderId}/${locationFolderId}`, {})

export const renameFile = (fileId, newName) =>
  axiosPatch(`edit/rename/file/${fileId}/${newName}`, {})
export const renameFolder = (folderId, newName) =>
  axiosPatch(`edit/rename/folder/${folderId}/${newName}`, {})

export const view = id => axiosGet(`view/${id}`)
