import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Person from '@mui/icons-material/Person';
import { Fab } from '@mui/material';
import { toggleProfileOpen } from '../../features/window/windowSlice';
import { getNote } from '../../supabaseClient/api';

const fabStyle = {
  position: 'absolute',
  bottom: 32,
  right: 32,
};

export default function Main({ graphData, setGraphData }) {
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    console.log(await getNote('3', '2'))
  }
  fetchRequest()

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
