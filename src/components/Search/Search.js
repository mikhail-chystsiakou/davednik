import React from 'react';
import { TextField } from '@mui/material';

export default function Search() {
  const [value, setValue] = React.useState("");
  return (
    <>
      <TextField value={value} onChange={(event => setValue(event.target.value))} />
    </>
  )
}
