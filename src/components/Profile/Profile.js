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

function Profile({
  connectNodes, selectedNode, name = "Михаил Чистяков", tags = ["#programmer", "#run", "#artist", "#extravert"],
  tgId = "@zoxal", about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
}) {
  const dispatch = useDispatch();
  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingTop: 1,
    paddingBottom: 3,
    paddingLeft: 3,
    gap: 5,
    height: window.innerHeight / 2
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

  const moveProfile = () => {

  }

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{ overflow: 'auto', paddingRight: 3, display: 'flex', flexDirection: "column", maxHeight: window.innerHeight / 2, gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
            <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
            <Box sx={{ display: 'flex', gap: 0.3, flexDirection: 'column', justifyContent: 'space-around' }}>
              <Typography variant='h6'>{name}</Typography>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center', marginTop: 1 }}>
                <img src={telegram} width={15} height={15} />
                <Typography variant='body2'>{tgId}</Typography>
              </Box>
              <ConnectButton sx={{ marginTop: 2 }} variant="contained" >Connect</ConnectButton>
            </Box>
          </Box>
          <Button onClick={() => dispatch(setWindowId(0))} sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
            <img src={close} width={20} height={20} />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {tags.map(tag =>
            <Chip label={tag} variant="outlined"
              onDelete={() => { console.log("todo") }}
              sx={{ marginLeft: 1 }}
            />
          )}
          <IconButton>
            <img src={edit} width={20} height={20} />
          </IconButton>
        </Box>
        <div style={{
          overflowY: "scroll", marginTop: '1%', maxHeight: 300
        }}>
          < Box >
            <Typography variant='h6'>О себе</Typography>
            <Typography variant="body2">{about}</Typography>
          </Box>
          <Box className='notes'>
            <Typography variant="h6">Мои заметки</Typography>
            <Typography variant="body2">{about}</Typography>
          </Box>
        </div>
      </Box >
    </Box >
  );
}

export default Profile;
