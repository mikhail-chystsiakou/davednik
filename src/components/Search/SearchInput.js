import React from "react";
import {
  TextField, FormGroup, IconButton, Box, InputBase
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Search.module.css';


export default function SearchInput() {
  const [value, setValue] = React.useState("");
  return (
    <Box
      sx={{ backgroundColor: "white", borderRadius: 5 }}
      padding={1}
    >
      <FormGroup row className={styles.Input}>
        <InputBase
          sx={{ ml: 1, flex: 1, marginLeft: 2 }}
          placeholder="Найти..."
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event => setValue(event.target.value))}
        />
        <IconButton color="secondary"
          fontSize="large"
          aria-label="upload picture"
          component="label"> <SearchIcon /></IconButton>
      </FormGroup>
    </Box>
  )
}
