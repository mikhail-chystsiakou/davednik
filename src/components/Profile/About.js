import { Box, Input, Typography } from '@mui/material';
import React from 'react';

export default function About({ about, isMyProfile, setUserEditedAbout }) {

  return (
    <Box>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>О себе</Typography>
      {
        isMyProfile ? <Input sx={{ fontSize: '0.9rem', fontWeight: 400, minWidth: "100%" }} multiline defaultValue={about} onChange={(event) => setUserEditedAbout(event.target.value)}/> :
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>{about}</Typography>
      }
    </Box>
  )
}
