import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 270,
    },
  },
}));

export default function Search({ dispatcher }) {
  
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="standard-basic" 
        label="Search your vocabulary..." 
        variant="outlined" 
        onChange={ evt => dispatcher({ type: 'on-search', state: { searchTerm: evt.target.value }})}
        onFocus={ evt => dispatcher({ type: 'on-search', state: { searchTerm: evt.target.value }})}
        onBlur={ evt => dispatcher({ type: 'on-search-blur', state: { searchTerm: evt.target.value }}) }
      />
    </form>
  );
}