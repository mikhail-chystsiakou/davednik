import { Box, Chip } from '@mui/material';

import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../img/avatar.png';
import './Profile.css';
import { setCurrentUser } from '../../features/graph/graphSlice';
import ProfileTags from './ProfileTags';

import About from './About';
import MyNotes from './MyNotes';
import ProfileHeader from './ProfileHeader';
import { useApp } from "../../AppContext";


function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.graph.user);
  const me = useSelector(state => state.user.user);

  const profileBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    overflowY: 'auto',
    position: 'absolute', left: '2%', right: "2%", bottom: "2%", zIndex: 9,
    height: window.innerHeight / 2
  };

  const isMyProfile = (user._id === me._id);
  const isGuest = (me._id == "guest");

  const commitChanges = () => {
    dispatch(setCurrentUser(
      { ...user, tags: me.tags, name: me.name, about: me.about }
    ));
  }

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: "column", gap: 3 }}>
        <ProfileHeader
          name={user.name} tgId={user.user} avatar={avatar}
          userId={user._id} me={me._id} isGuest={isGuest}
          isMyProfile={isMyProfile}
          commitChanges={commitChanges}
        />
        <ProfileTags isMyProfile={isMyProfile} />
        <About about={user.about} isMyProfile={isMyProfile} />
        {!isMyProfile && <MyNotes />}
      </Box>
    </Box >
  );
}

export default Profile;
