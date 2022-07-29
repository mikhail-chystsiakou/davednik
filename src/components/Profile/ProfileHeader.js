import React from 'react';
import {
  Avatar, Box, Typography, Chip
} from '@mui/material';

export default function Header({ name, tgId, avatar }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'no-wrap' }}>
      <Avatar src={avatar} sx={{ maxWidth: 80, maxHeight: 80, minWidth: 48, minHeight: 48 }} />
      <Box sx={{ marginLeft: 5 }}>
        <Typography variant='h5'>{name}</Typography>
        <Typography variant='body2'>{tgId}</Typography>
        <Chip label="connect" color='primary' sx={{ marginTop: 1 }} />
      </Box>
    </Box>
  )
}

