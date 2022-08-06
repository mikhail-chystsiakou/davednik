import React from "react";
import Person from '@mui/icons-material/Person';
import { Fab } from '@mui/material';

const fabStyle = {
  position: 'absolute',
  bottom: 32,
  right: 32,
};


export const ProfileButton = ({onClick}) => {
  return (
    <Fab sx={fabStyle} color='secondary' onClick={onClick}>
      <Person />
    </Fab>
  )
}
