import React from 'react';
import { Box, TextField, InputBase } from "@mui/material";

export default function Search() {
  const [value, setValue] = React.useState("");

  return (
    <Box
      sx={{
        position: 'absolute', zIndex: 10,
        top: 32, left: 32, right: 32,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 10,
        width: '100%', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center',
      }}>
        <InputBase
          placeholder="Поиск"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={value}
          onChange={event => setValue(event.target.value)}
          sx={{ width: '80%', maxWidth: 1000, backgroundColor: "#FFFFFF", marginLeft: 3 }}
        />
      </Box>
    </Box>
  )
}
