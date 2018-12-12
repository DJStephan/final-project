import React, { Component } from "react";
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { downloadFile, downloadFolder} from '../../services/api'
import { MdFileDownload } from 'react-icons/md'
import JSZip from 'jszip'
import saveAs from 'file-saver'
import {loadError} from '../../ducks/filetree.duck'

function base64ToArrayBuffer(base64) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

//Create file(blob) and download (brower defined)
function saveByteArray(reportName, byte, type) {
    let blob = new Blob([byte], { type: type });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    let fileName = reportName;
    link.download = fileName;
    link.click();
}

const bulid = (data, path, zip) => {
    for(let file of data.files){
        zip.file(path + file.fileName, file.data, {base64: true})
    }
    for(let folder of data.folders){
        bulid(folder, path + folder.folderName + '/', zip)
    }
}

class Download extends Component {

    handleClick = () => {
        if (!this.props.selectedFile) {
            downloadFolder(this.props.selectedFolder)
                .then(response => {
                    if (response.result.statusCode === 200){
                        let zip = new JSZip()
                        bulid(response.folder, '', zip)
                        zip.generateAsync({type:"blob"}).then(function(content) {
                            saveAs(content, response.folder.folderName)
                        })
                    } else {
                        return this.props.loadError(response.result.message)
                    }
                })
        } else {
            downloadFile(this.props.selectedFile)
                .then(response => { console.log(response); return response; })
                .then(response => {
                    if (response.result.statusCode === 200) {
                        //Create file and ask for download
                        saveByteArray(
                            response.file.fileName,
                            base64ToArrayBuffer(response.file.data, response.file.type)
                        )
                    } else {
                        this.props.loadError(response.result.message)
                    }
                })
                .catch(err => this.props.loadError(err.message))
        }
    }

    render() {
        return (
            <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                    <MdFileDownload />
                </ListItemIcon>
                <ListItemText primary="Download" />
            </ListItem>
        )
    }
}

Download.propTypes = {
    selectedFile: PropTypes.number,
    selectedFolder: PropTypes.number
}

const mapStateToProps = state => ({
    selectedFile: state.selectedFile,
    selectedFolder: state.selectedFolder
})

const mapDispatchToProps = ({ loadError })

export default connect(mapStateToProps, mapDispatchToProps)(Download)