import React, { useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Typography, Input
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile } from '../../features/window/windowSlice';
import close from '../../img/close.png';
import save from '../../img/done.png';
import telegram from '../../img/telegram.png';
import { connectUsers, disconnectUsers } from '../../features/graph/graphAPI';
import { addNeighbor, removeNeighbor } from '../../features/user/userSlice';

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

const DisconnectButton = styled(Button)({
  color: "#FFFFFF",
  backgroundColor: "#c13050",
  '&:hover': {
    backgroundColor: "#c13050",
  },
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 200,
  width: 80
});



export default function Header({
  name, tgId, avatar, me, userId, isGuest,
  connectNodes, disconnectNodes, isMyProfile,
  setUserEditedName, saveEdit }) {
  const dispatch = useDispatch();
  const neighbors = useSelector(state => state.user.neighbors);

  let connectButton;
  if (!neighbors.includes(userId)) {
    connectButton = <ConnectButton variant="contained" onClick={() => {
      const createEdge = async () => {
        dispatch(addNeighbor(userId));
        await connectNodes(me, userId);
        await connectUsers({ from: me, to: userId });
      }
      createEdge().catch(console.error);
    }}>Connect</ConnectButton>
  } else {
    connectButton = <DisconnectButton variant="contained" onClick={() => {
      const deleteEdge = async () => {
        dispatch(removeNeighbor(userId));
        await disconnectNodes(me, userId);
        await disconnectUsers({ from: me, to: userId });
      }
      deleteEdge().catch(console.error);
    }}>Disconnect</DisconnectButton>
  }


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Avatar src={avatar} sx={{ maxWidth: 80, maxHeight: 80, minWidth: 80, minHeight: 80 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 0.5 }}>
          {
            isMyProfile ? <Input sx={{ fontSize: '1rem', fontWeight: 600 }} defaultValue={name} onChange={(event) => setUserEditedName(event.target.value)} /> : <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>{name}</Typography>
          }
          <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center' }}>
            <img src={telegram} width={15} height={15} />
            <Typography variant='body2'>{tgId}</Typography>
          </Box>
          {(me !== userId) && !isGuest && connectButton}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
          <img src={save} width={20} height={20} onClick={saveEdit} />
        </Button>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
          <img src={close} width={20} height={20} onClick={() => dispatch(closeProfile())} />
        </Button>
      </Box>
    </Box>
  )
}

