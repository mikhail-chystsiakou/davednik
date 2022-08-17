import React from "react";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../img/avatar.png';
import './Profile.css';
import { setSelectedNode } from '../../features/graph/graphSlice';
import Tags from './Tags';
import About from './About';
import MyNotes from './MyNotes';
import Header from './Header';
import { useApp } from '../../AppContext';


function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.graph.selectedNode);
  const me = useSelector(state => state.user.user);
  const { editNode } = useApp();

  const profileBoxStyle = {
    // TODO: переписать на CSS
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    position: 'absolute', left: '2%', right: "2%", bottom: "2%", zIndex: 9,
    height: "65vh",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
  };

  const isMyProfile = (user._id === me._id);
  const isGuest = (me._id === "guest");

  const commitChanges = () => {
    // TODO: Сделать отображение в графе!
    dispatch(setSelectedNode(
      { ...user, tags: me.tags, name: me.name, about: me.about }
    ));
    console.log(user)
    editNode({ node: me.name, id: user.id })
  }

  return (
    <Box sx={profileBoxStyle}>
      <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, overflow: 'auto', maxHeight: window.innerHeight / 2, paddingRight: 3 }}>
        <Header
          name={user.name} tgId={user.user} avatar={avatar}
          userId={user._id} me={me._id} isGuest={isGuest}
          isMyProfile={isMyProfile}
          commitChanges={commitChanges}
        />
        <Tags isMyProfile={isMyProfile} />
        <About about={user.about} isMyProfile={isMyProfile} />
        {!isMyProfile && <MyNotes me={me._id} userId={user.id} />}
      </Box>
    </Box >
  );
}

export default Profile;
