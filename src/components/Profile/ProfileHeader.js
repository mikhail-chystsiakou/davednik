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
import { editUser } from '../../features/user/userAPI';
import { setUser } from '../../features/user/userSlice';
import { useApp, ACTION_TYPES } from '../../AppContext';


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
  name, tgId, avatar, userId, isGuest, isMyProfile, commitChanges }) {
  const reduxDispatch = useDispatch();
  const { neighbors } = useSelector(state => state.user);
  const me = useSelector(state => state.user.user);
  const { dispatch } = useApp();

  let connectButton;
  // choose connect or disconnect button
  if (!neighbors.includes(userId)) {
    connectButton = <ConnectButton variant="contained" onClick={() => {
      const createEdge = async () => {
        reduxDispatch(addNeighbor(userId));
        dispatch({ type: ACTION_TYPES.CONNECT_NODES, payload: { _from: me._id, _to: userId } });
        await connectUsers({ from: me._id, to: userId });
      }
      createEdge().catch(console.error);
    }}>Connect</ConnectButton>
  } else {
    connectButton = <DisconnectButton variant="contained" onClick={() => {
      const deleteEdge = async () => {
        reduxDispatch(removeNeighbor(userId));
        dispatch({ type: ACTION_TYPES.DISCONNECT_NODES, payload: { _from: me._id, _to: userId } });
        await disconnectUsers({ from: me._id, to: userId });
      }
      deleteEdge().catch(console.error);
    }}>Disconnect</DisconnectButton>
  }

  const editUserName = (newName) => {
    editUser({ id: me.id, name: newName });
    reduxDispatch(setUser({ ...me, name: newName }));
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Avatar src={avatar} sx={{ maxWidth: 80, maxHeight: 80, minWidth: 80, minHeight: 80 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 0.5 }}>
          {
            isMyProfile ?
              <Input
                sx={{ fontSize: '1rem', fontWeight: 600 }}
                defaultValue={name} inputProps={{ maxLength: 40 }}
                onChange={(event) => editUserName(event.target.value)} />
              : <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>{name}</Typography>
          }
          <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center' }}>
            <img src={telegram} width={15} height={15} />
            <Typography variant='body2'>{tgId}</Typography>
          </Box>
          {(me !== userId) && !isGuest && connectButton}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text"
          onClick={() => {
            commitChanges();
            reduxDispatch(closeProfile());
          }} >
          <img src={save} width={20} height={20} />
        </Button>
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text"
          onClick={() => reduxDispatch(closeProfile())} >
          <img src={close} width={20} height={20} />
        </Button>
      </Box>
    </Box>
  )
}

