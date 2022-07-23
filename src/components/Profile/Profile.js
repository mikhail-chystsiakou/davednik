import { autocompleteClasses, Avatar, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from "react";
import avatar from '../../img/avatar.png';
import close from '../../img/close.png';
import edit from '../../img/edit.png';
import telegram from '../../img/telegram.png';
import './Profile.css';

function Profile({
  handleCloseProfile, width, name = "Михаил Чистяков", tags = ["#programmer", "#run", "#artist", "#extravert"],
  tgId = "@zoxal", about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
}) {

  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    display: "flex",
    padding: 3,
    flexDirection: "column",
    gap: 5
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

  return (
    <>
      <Box sx={profileBoxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Avatar src={avatar} sx={{ width: 63, height: 63 }} />
            <Box sx={{ display: 'flex', gap: 0.3, flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{name}</Typography>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center' }}>
                <img src={telegram} width={15} height={15} />
                <Typography sx={{ fontSize: 12, fontWeight: 200 }}>{tgId}</Typography>
              </Box>
              <ConnectButton variant="contained" >Connect</ConnectButton>
            </Box>
          </Box>
          <Button onClick={handleCloseProfile} variant="text">
            <img src={close} width={20} height={20} />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {tags.map(tag =>
            <Typography key={tag} sx={{ fontSize: 12, fontWeight: 200 }}>{tag}</Typography>)}
          <img src={edit} width={20} height={20} />
        </Box>
        <Box className='about'>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>О себе</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>{about}</Typography>
        </Box>
        <Box className='notes'>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>Мои заметки</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>{about}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
