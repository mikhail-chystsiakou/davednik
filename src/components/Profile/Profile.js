import {
  autocompleteClasses, Avatar,
  Box, Button, Typography, IconButton, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from "react";
import { setWindowId } from '../../features/window/windowSlice';
import avatar from '../../img/avatar.png';
import close from '../../img/close.png';
import edit from '../../img/edit.png';
import telegram from '../../img/telegram.png';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {

  const user = useSelector(state => state.graph.user);
  const me = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingTop: 1,
    paddingBottom: 3,
    paddingLeft: 3,
    gap: 5,
    width: '100%',
    height: window.innerHeight * 0.4
  };

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

  const isMyProfile = user._id === me._id;

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{
        overflow: 'auto', paddingRight: 3,
        display: 'flex', flexDirection: "column",
        maxHeight: window.innerHeight / 2, gap: 3,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
            <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
            <Box sx={{ display: 'flex', gap: 0.3, flexDirection: 'column', justifyContent: 'space-around' }}>
              <Typography variant='h6'>{user.name}</Typography>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center', marginTop: 1 }}>
                <img src={telegram} width={15} height={15} />
                <Typography variant='body2'>{user.tgId}</Typography>
              </Box>
              {(!isMyProfile) && <ConnectButton sx={{ marginTop: 2 }} variant="contained" >Connect</ConnectButton>}
            </Box>
          </Box>
          <Button onClick={() => dispatch(setWindowId(0))} sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
            <img src={close} width={20} height={20} />
          </Button>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {user.tags.map(tag => {
            if (isMyProfile) {
              return <Chip label={tag} variant="outlined"
                onDelete={() => { console.log("todo") }}
                sx={{ marginLeft: 1 }}
              />
            }
            return <Chip label={tag} variant="outlined"
              onClick={() => { }}
              sx={{ marginLeft: 1 }}
            />
          }
          )}
          {(isMyProfile) &&
            <IconButton>
              <img src={edit} width={20} height={20} />
            </IconButton>
          }
        </Box>
        <div style={{
          overflowY: "scroll", marginTop: '1%', maxHeight: window.innerHeight
        }}>
          < Box >
            <Typography variant='h6'>О себе</Typography>
            <Typography variant="body2">{user.about}</Typography>
          </Box>
          <Box className='notes'>
            <Typography variant="h6">Мои заметки</Typography>
            <Typography variant="body2">{user.about}</Typography>
          </Box>
        </div>
      </Box >
    </Box >
  );
}

export default Profile;
