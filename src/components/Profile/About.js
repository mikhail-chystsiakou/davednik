import React, { useState, useEffect } from 'react';
import {
  Avatar, Box, Typography, Chip, TextField
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, updateNote } from '../../supabaseClient/api';
import CircularProgress from '@mui/material/CircularProgress';

export default function About({ about, isMyProfile }) {

  return (
    <Box>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>О себе</Typography>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>{about}</Typography>
      {/* {(isNotes) ? (noteText !== null) ? 
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Здесь вы можете оставить заметки об этом пользователе. Никто кроме вас их не увидит"
          value={noteText}
          onChange={event => handleUpdate(event.target.value)}
          style={{ minWidth: '99%' }}
        /> : <CircularProgress />  :
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>{about}</Typography> */}
    </Box>
  )
}
