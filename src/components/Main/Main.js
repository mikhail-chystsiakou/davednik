import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Person from '@mui/icons-material/Person';
import { Fab } from '@mui/material';
import { toggleProfileOpen } from '../../features/window/windowSlice';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export default function Main({ graphData, setGraphData }) {
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Search />
      <Fab sx={fabStyle} color='secondary' onClick={() => dispatch(toggleProfileOpen())}>
        <Person />
      </Fab>
      {(profileIsOpen) && <Profile setGraphData={setGraphData} />}
    </>
  )
}
