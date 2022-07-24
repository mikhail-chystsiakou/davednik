import { Avatar, Box, Button, Chip, IconButton, Input, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setWindowId } from '../../features/window/windowSlice';
import avatar from '../../img/avatar.png';
import close from '../../img/close.png';
import save from '../../img/done.png';
import edit from '../../img/edit.png';
import telegram from '../../img/telegram.png';
import './Profile.css';
import { connectUsers } from '../../features/graph/graphAPI';


function Profile({
  setGraphData, name = "Михаил Чистяков", tags = ["#programmer", "#run", "#artist", "#extravert"],
  tgId = "@zoxal", about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
}) {
  const dispatch = useDispatch();
  const currentNode = useSelector(state => state.graph.currentNode);
  const user = useSelector(state => state.graph.user);
  const me = useSelector(state => state.user.user);

  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingTop: 1,
    paddingBottom: 3,
    paddingLeft: 3,
    gap: 5,
    width: '100%',
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

  const isMyProfile = user._id === me._id;

  const saveEdit = () => {
    //toda
  }

  const moveProfile = () => {
    //todo
  }

  const connectNodes = ({ from, to }) => {
    setGraphData(({ nodes, links }) => {
      return {
        nodes: [...nodes],
        links: [...links, { source: from, target: to }]
      };
    });
    connectUsers({from: from, to: to});
  }

  return (
    <Box sx={profileBoxStyle}>
      <Button sx={{ margin: '0 auto', display: "flex", pt: 0 }} onClick={moveProfile}>
        <div className="line"></div>
      </Button>
      <Box sx={{ overflow: 'auto', paddingRight: 3, display: 'flex', flexDirection: "column", maxHeight: window.innerHeight / 2, gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }} >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar src={avatar} sx={{ width: 63, height: 63 }} />
            <Box sx={{ display: 'flex', gap: 0.3, flexDirection: 'column', justifyContent: 'flex-start' }}>
              {
                isMyProfile ? <Input sx={{ fontSize: 15, fontWeight: 600 }} defaultValue={name} /> :
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{name}</Typography>
              }
              <Box sx={{ display: "flex", gap: 0.5, alignItems: 'center' }}>
                <img src={telegram} width={15} height={15} />
                <Typography variant='body2'>{user.tgId}</Typography>
              </Box>
              {!isMyProfile &&
                <ConnectButton variant="contained" onClick={() => connectNodes({ from: me._id, to: currentNode })}>Connect</ConnectButton>
              }
            </Box>
          </Box>
          {
            isMyProfile &&
            <Button sx={{ p: 0, display: "flex", minWidth: 20 }} onClick={saveEdit} variant="text">
              <img src={save} width={20} height={20} />
            </Button>
          }
          <Button onClick={() => dispatch(setWindowId(0))} sx={{ p: 0, display: "flex", minWidth: 20 }} variant="text">
            <img src={close} width={20} height={20} />
          </Button>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {user.tags != null && user.tags.map(tag => {
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
        <Box className='about'>
          <Typography variant='h6'>О себе</Typography>
          {
            isMyProfile ? <Input sx={{ fontSize: 12, fontWeight: 400, minWidth: "100%" }} multiline defaultValue={about} /> :
              <Typography variant="body2">{user.about}</Typography>
          }
        </Box>
        {
          !isMyProfile &&
          <Box className='notes'>
            <Typography variant='h6'>Мои заметки</Typography>
            <Typography variant="body2">{user.about}</Typography>
          </Box>
        }
      </Box>
    </Box>
  );
}

export default Profile;