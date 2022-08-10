import { Box, Input, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { getNote, updateNote } from '../../supabaseClient/api';

export default function MyNotes({ userId = "", me = "" }) {
  const [noteText, setNoteText] = useState(null);

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
        <Input
          sx={{ fontSize: '0.9rem', fontWeight: 400, minWidth: "100%" }}
          multiline
          defaultValue={noteText}
          inputProps={{ maxLength: 400 }}
          onChange={(event) => handleUpdate(event.target.value)}
          placeholder="Здесь вы можете оставить заметки об этом пользователе. Никто кроме вас их не увидит"
        />
        : <CircularProgress />
      }
    </Box>
  )
}
