import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import DavednikGraph from '../DavednikGraph';
import Search from '../Search/Search';
import { closeProfile, openProfile } from '../../features/window/windowSlice';
import { ProfileButton } from './ProfileButton'


export default function Main() { //{ graphData, setGraphData, connectNodes, disconnectNodes, updateTags }) {
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const searchIsOpen = useSelector(state => state.window.searchIsOpen);
  const dispatch = useDispatch();
  return (
    <>
      <DavednikGraph />
      {(!profileIsOpen) && <Search />}
      {(profileIsOpen) ? <Profile /> : (!searchIsOpen) && <ProfileButton onClick={
        () => dispatch((profileIsOpen) ? closeProfile() : openProfile())
      } />}
    </>
  )
}
