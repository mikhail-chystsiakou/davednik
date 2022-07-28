import React from 'react';
import {
  Avatar, Box, Typography, Chip, TextField
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';


export default function About({ isNotes = false, about = 'lorem ipsum' }) {
  return (
    <Box>
      <Typography variant='h6'>{(isNotes) ? "Мои замтеки" : "О себе"}</Typography>
      {(isNotes) ?
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Здесь вы можете оставить заметки об этом пользователе. Никто кроме вас их не увидит"
          style={{ minWidth: '99%' }}
        /> :
        <Typography variant='body1'>{about}</Typography>
      }
    </Box>
  )
}
