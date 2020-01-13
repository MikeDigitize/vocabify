import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    color: 'darkslategrey',
    '&:hover, &:focus': {
      backgroundColor: 'white'
    }
  }
});

export default function MessagePopup({ open, dispatcher, msg }) {
  
  const classes = useStyles();
  return (
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`bottom,horizontal`}
        autoHideDuration={6000}
        open={open}
        onClick={() => dispatcher({ type: 'on-hide-popup' })}
        message={ msg }
        action= {
          <Button 
            size="small" 
            onClick={() => dispatcher({ type: 'on-hide-popup' })}
            className={ classes.root }
          >
              Close
          </Button>
        }
    />
  );
}