import { Box, Chip } from '@mui/material';

import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { connectUsers } from '../../features/graph/graphAPI';
import avatar from '../../img/avatar.png';
import './Profile.css';
import { editUser } from '../../features/user/userAPI';
import { Fade } from "react-awesome-reveal";
import ProfileTags from './ProfileTags';

import About from './About';
import MyNotes from './MyNotes';
import ProfileHeader from './ProfileHeader';


function Profile({
  graphData, setGraphData,
  connectNodes, disconnectNodes,  name = "Михаил Чистяков",
  tags = "#programmer#run#artist#extravert",
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

  const isMyProfile = (user._id === me._id);
  const isGuest = (me._id == "guest");

  const saveEdit = () => {
    var editedUser = { ...user, name: userEditedName, about: userEditedAbout };
    editUser(editedUser);
    console.log(editedUser)
  }

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: "column", gap: 3 }}>
        <ProfileHeader
          name={user.name} tgId={user.user} avatar={avatar}
          userId={user._id} me={me._id} isGuest={isGuest}
          connectNodes={connectNodes} disconnectNodes={disconnectNodes}
          isMyProfile={isMyProfile} setUserEditedName={setUserEditedName}
          saveEdit={saveEdit}
        />
        <ProfileTags isMyProfile={isMyProfile} graphData={graphData} setGraphData={setGraphData} />
        <About about={about} isMyProfile={isMyProfile} setUserEditedAbout={setUserEditedAbout} />
        {!isMyProfile && <MyNotes />}
      </Box>
    </Box >
  );
}

export default Profile;
