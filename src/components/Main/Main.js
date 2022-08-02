import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Person from '@mui/icons-material/Person';
import { Fab } from '@mui/material';
import { openProfile, closeProfile } from '../../features/window/windowSlice';

const fabStyle = {
  position: 'absolute',
  bottom: 32,
  right: 32,
};

export default function Main({ graphData, setGraphData, connectNodes, disconnectNodes, updateTags }) {
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Search />
      {
        !profileIsOpen &&
        <Fab sx={fabStyle} color='secondary' onClick={() => dispatch((profileIsOpen) ? closeProfile() : openProfile())}>
          <Person />
        </Fab>
      }
      {(profileIsOpen) &&
        <Profile
          setGraphData={setGraphData}
          connectNodes={connectNodes}
          disconnectNodes={disconnectNodes}
          updateTags={updateTags}
        />
      }
    </>
  )
}
