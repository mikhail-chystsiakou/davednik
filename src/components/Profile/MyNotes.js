import React, { useState, useEffect } from 'react';
import {
  Avatar, Box, Typography, Chip, TextField
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, updateNote } from '../../supabaseClient/api';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyNotes({ userId = "", me = "", isMyProfile }) {
  const [noteText, setNoteText] = useState(null);
  console.log(me, userId)

  const handleUpdate = async (value) => {
    setNoteText(value)
    await updateNote(me, userId, value);
  }

  useEffect(() => {
    const getNoteOnServer = async (author, user) => {
      setNoteText(await getNote(author, user));
    }
    getNoteOnServer(me, userId).then(res => res).catch(console.error);
  }, [userId, me])

  return (
    <Box>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Мои заметки</Typography>
      {(noteText !== null) ?
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Здесь вы можете оставить заметки об этом пользователе. Никто кроме вас их не увидит"
          value={noteText}
          onChange={event => handleUpdate(event.target.value)}
          style={{ minWidth: '99%' }}
        /> : <CircularProgress />
      }
    </Box>
  )
}
