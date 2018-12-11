import React, { Component } from "react";
import { Button, Dialog, DialogContent, DialogTitle, ListItem, Slide } from '@material-ui/core'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Error extends Component {
  render() {
    return (
      <ListItem button onClick = {this.handleOpen}>
        {this.props.children}
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          scroll="paper"
        >
          <DialogTitle>ERROR</DialogTitle>
          <DialogContent>
            {this.props.message}
          </DialogContent>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Dialog>
      </ListItem>
    );
  }
}



export default Error
