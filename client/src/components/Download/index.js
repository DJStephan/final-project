import React, { Component } from "react";
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

class Download extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({
            ...this.state,
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            open: false
        })
    }

    handleClick = () => {
        //make ddownload
    }

    render() {
        return (
            <ListItem button onClick={this.handleClick}>
                <Dialog 
                open = {this.state.open}
                onClose = {this.handleClose}>
                    <DialogTitle>Download Result</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tell user what resulted from Download
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </ListItem>
        )

    }
}

Sidebar.propTypes = {
    selectedFile: PropTypes.number,
    selectedFolder: PropTypes.number
}

const mapStateToProps = state => ({
    selectedFile: state.selectedFile,
    selectedFolder: state.selectedFolder
})

export default connect(mapStateToProps)(Download)