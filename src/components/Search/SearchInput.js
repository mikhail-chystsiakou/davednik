import React from "react";
import {
  TextField, FormGroup, IconButton, Box, InputBase, Autocomplete
} from '@mui/material';

export default function SearchInput() {
  const [value, setValue] = React.useState("");

  return (
    <Box sx={{ marginBottom: 0 }}>
      <TextField
        id="search"
        value={value}
        onChangeValue={event => setValue(event.target.value)}
        sx={{ width: '100%', backgroundColor: "#FFFFFF" }}
      />
    </Box>
  )
}
