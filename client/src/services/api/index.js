import axios from 'axios'


const localPath = "http://localhost:8080/"

const axiosGet = (url, params) => {
  return axios.get(localPath+url, {params: params})
    .then(response => response.data);
}
const axiosDelete = (url, params) => {
  return axios.delete(localPath+url, {params: params})
    .then(response => response.data);
}
const axiosPost = (url, data) => {
  return axios.post(localPath+url, data)
    .then(response => response.data);
}
const axiosPatch = (url, params) => {
  return axios.patch(localPath+url, {params: params})
    .then(response => response.data)
}


export const uploadFile = (data) =>
  axiosPost(`upload/file`,data)
    .then(response => console.log(response))

export const uploadFolder = (data) =>
  axiosPost(`upload/folder`,data)
    .then(response => console.log(response))


export const downloadFile = (fileId) =>
  axiosGet('download/file',{fileId: fileId})
    .then(response => console.log(response))
export const downloadFolder = (folderId) =>
  axiosGet('download/folder',{folderId: folderId})
    .then(response => console.log(response))


export const deleteFile = (fileId) =>
  axiosDelete('edit/delete/file',{fileId: fileId})
    .then(response => console.log(response))
export const deleteFolder = (folderId) =>
  axiosDelete('edit/delete/folder',{folderId: folderId})
    .then(response => console.log(response))

export const createFolder = (folderId, folderName) =>
  axiosPost('edit/create',{params: {folderId: folderId, folderName: folderName}})
    .then(response => console.log(response))

export const moveFile = (fileId, locationFolderId) =>
  axiosPatch('edit/move/file',{fileId: fileId, locationFolderId: locationFolderId})
    .then(response => console.log(response))
export const moveFolder = (folderId, locationFolderId) =>
  axiosPatch('edit/move/folder',{folderId: folderId, locationFolderId: locationFolderId})
    .then(response => console.log(response))

export const renameFile = (fileId, newName) =>
  axiosPatch('edit/rename/file', {fileId: fileId, newName: newName})
    .then(response => console.log(response))
export const renameFolder = (folderId, newName) =>
  axiosPatch('edit/rename/folder', {folderId: folderId, newName: newName})
    .then(response => console.log(response))

export const view = (id) =>
  axiosGet('view',{id: id})
    .then(response => console.log(response))