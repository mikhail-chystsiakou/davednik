import React from 'react';
import {
  TextField, FormGroup, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const [value, setValue] = React.useState("");
  return (
    <FormGroup row>
      <TextField value={value} onChange={(event => setValue(event.target.value))} />
      <IconButton color="primary" aria-label="upload picture" component="label"> <SearchIcon /></IconButton>
    </FormGroup>
  )
}
