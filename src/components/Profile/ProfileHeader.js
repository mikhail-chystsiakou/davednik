import React from 'react';
import {
  Avatar, Box, Typography, Button
} from '@mui/material';
import telegram from '../../img/telegram.png';
import save from '../../img/done.png';
import close from '../../img/close.png';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfileOpen } from '../../features/window/windowSlice';

export default function Header({ name, tgId, avatar, isMyProfile }) {

  const dispatch = useDispatch();

  const ConnectButton = styled(Button)({
    color: "#FFFFFF",
    backgroundColor: "#3050C1",
    '&:hover': {
      backgroundColor: "#3050C1",
    },
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 200,
    width: 80
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Avatar src={avatar} sx={{ maxWidth: 80, maxHeight: 80, minWidth: 80, minHeight: 80 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 0.5 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{name}</Typography>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center'}}>
            <img src={telegram} width={15} height={15} />
            <Typography variant='body2'>{tgId}</Typography>
          </Box>
          { !isMyProfile && <ConnectButton variant="contained">Connect</ConnectButton>}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
          <img src={save} width={20} height={20} />
        </Button>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
          <img src={close} width={20} height={20} />
        </Button>
      </Box>
    </Box>
  )
}

