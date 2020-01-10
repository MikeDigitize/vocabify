import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function MessagePopup({ open, onToggle, msg }) {
  return (
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`bottom,horizontal`}
        open={open}
        onClick={onToggle}
        message={ msg }
    />
  );
}