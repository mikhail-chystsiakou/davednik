import { Avatar, Box, Button, Chip, IconButton, Input, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfileOpen } from '../../features/window/windowSlice';
import avatar from '../../img/avatar.png';
import close from '../../img/close.png';
import save from '../../img/done.png';
import edit from '../../img/edit.png';
import telegram from '../../img/telegram.png';
import './Profile.css';
import { connectUsers } from '../../features/graph/graphAPI';
import { editUser } from '../../features/user/userAPI';
import { Fade } from "react-awesome-reveal";

import ProfileHeader from './ProfileHeader';
import About from './About';


function Profile({
  setGraphData, name = "Михаил Чистяков", tags = "#programmer#run#artist#extravert",
  tgId = "@zoxal", about = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.graph.user);
  const me = useSelector(state => state.user.user);
  const [userEditedName, setUserEditedName] = useState(user.name);
  const [userEditedAbout, setUserEditedAbout] = useState(user.about);


  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    overflowY: 'auto',
    position: 'absolute', left: '2%', right: "2%", bottom: "2%", zIndex: 9,
    height: window.innerHeight / 2
  };

  const isMyProfile = user._id === me._id;

  const connectNodes = ({ from, to }) => {
    console.log(from, to)
    setGraphData(({ nodes, links }) => {
      return {
        nodes: [...nodes],
        links: [...links, { source: from, target: to }]
      };
    });
    connectUsers({ from: from, to: to });
  }

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: "column", gap: 3 }}>
        <ProfileHeader name={name} tgId={tgId} avatar={avatar} />
        <Box>
        {
          tags.split('#').slice(1).map(tag => {
            if (isMyProfile) {
              return <Chip label={"#" + tag} variant="outlined"
                onDelete={() => { console.log("todo") }}
                sx={{ margin: 1 }}
              />
            }
            return <Chip label={"#" + tag} variant="outlined"
              onClick={() => { }}
              sx={{ margin: 1 }}
            />
          })
        }
        </Box>        
        <About isNotes={false} about={about} />
        <About isNotes={true} about={about} userId={user._id} me={me._id} />
        <Box sx={{height: 64}}> </Box>
      </Box>
    </Box >
  );
}

export default Profile;
