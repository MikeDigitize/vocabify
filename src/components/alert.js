import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Alert({ open, dispatcher, alertMessage }) {

  const handleClose = () => {
    dispatcher({ type: 'on-delete-item-response', state: {
        delete: false
    }})
  };

  return (
    <Dialog
        open={open}
        maxWidth={'xs'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{`${alertMessage}`}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            It cannot be undone! Remember you can click into any words and definitions you have saved to edit them.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Delete
            </Button>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
    </Dialog>
  );
}