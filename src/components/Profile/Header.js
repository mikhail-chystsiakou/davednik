import React from 'react';
import {
  Avatar, Box, Button, Typography, Input
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile } from '../../features/window/windowSlice';
import close from '../../img/close.png';
import save from '../../img/done.png';
import telegram from '../../img/telegram.png';
import { editUser } from '../../features/user/userAPI';
import { setUser } from '../../features/user/userSlice';
import { Connect } from './Connect.js';


export default function Header({
  name, tgId, avatar, userId, isGuest,
  isMyProfile, commitChanges }) {
  const dispatch = useDispatch();
  const { neighbors } = useSelector(state => state.user);
  const me = useSelector(state => state.user.user);

  const editUserName = (newName) => {
    editUser({ id: me.id, name: newName });
    dispatch(setUser({ ...me, name: newName }));
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
          {(tgId) &&
            <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center' }}>
              <img src={telegram} width={15} height={15} />
              <Typography variant='body2'> <a href={`https://t.me/${tgId}`}>{tgId}</a></Typography>
            </Box>
          }
          {(!isMyProfile) && !isGuest && <Connect isConnected={!neighbors.includes(userId)} from={me._id} to={userId} />}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {(isMyProfile) &&
          <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text"
            onClick={() => {
              commitChanges();
              dispatch(closeProfile());
            }} >
            <img src={save} width={20} height={20} />
          </Button>
        }
        <Button sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text"
          onClick={() => dispatch(closeProfile())} >
          <img src={close} width={20} height={20} />
        </Button>
      </Box>
    </Box>
  )
}

