import React, { Component } from "react"
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { ListItem, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { deleteFile, deleteFolder } from '../../services/api'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Delete extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            name: '[fileName/folderName]',
            type: '[selected element]'
        }
        this.textInput = React.createRef();
    }

    state = {
        open: false,
        name: '[fileName/folderName]',
        type: '[selected element]'
    }

    handleOpen = () => {
        if(!this.state.open) {
            this.setState({ 
                open: true 
            });
        }
    }

    handleClose = () => {
        this.setState({
            open: false 
        })
    }

    deleteSelected = () => {
        console.log(this.state)
        // NOT DONE! Final version must do the following:
        //   - Determine whether it's a folder or file
        //   - Edit state.name and state.type accordingly (for the dialogue box)
        //   - Call the appropriate function on the file or folder.
    }

    render() {
        return (
            <ListItem button onClick = {this.handleOpen}>
                {this.props.children}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    scroll="paper"
                >
                    {/* Should we center everything? It might look better... */}
                    <DialogTitle>Delete {this.state.type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete {this.state.name}?
                        </DialogContentText>
                    </DialogContent>
                    {/* Maybe we should re-order these buttons as well... */}
                    <DialogActions>
                        <Button onClick={this.deleteSelected} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </ListItem>
        );
    }
}

export default Delete