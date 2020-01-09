import React, { useReducer } from 'react';
import { searchReducer, initialSearchState } from '../reducers/search-reducer'; 
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

export default function Search() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const classes = useStyles();

  console.log('Search state', state);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="standard-basic" 
        label="Search your vocabulary..." 
        variant="outlined" 
        onChange={ evt => dispatch({ type: 'on-search', state: { searchTerm: evt.target.value }})}
      />
    </form>
  );
}