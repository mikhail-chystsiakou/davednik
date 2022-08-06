import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Person from '@mui/icons-material/Person';
import { Fab } from '@mui/material';
import { openProfile, closeProfile } from '../../features/window/windowSlice';
import { AppProvider, useApp } from "../../AppContext";
import { setGraphData as setStoreGraph } from '../../features/graph/graphSlice';
import * as graphAPI from '../../features/graph/graphAPI';
import DavednikGraph from '../DavednikGraph';

const fabStyle = {
  position: 'absolute',
  bottom: 32,
  right: 32,
};

export default function Main() {
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const dispatch = useDispatch();

  const setGraphData = useApp().setData;
  console.log("render MAIN")

  React.useEffect(() => {
    const loadGrpah = async () => {
      const users = await graphAPI.loadAllUsers();
      const edges = await graphAPI.loadAllEdges();
      let graph = { nodes: [], links: [] }
      for (const u of users) {
        graph.nodes.push({
          ...u, id: u._id,
          color: "#434343"
        })
      }
      for (const e of edges) {
        graph.links.push({ source: e._from, target: e._to, value: 0 }) // TODO: value
      }
      if (graph != null) {
        setGraphData(graph);
      }
    }
    loadGrpah().catch(console.error);
  }, [])


  return (
    <>
      <Search />
      <DavednikGraph />
      {
        !profileIsOpen &&
        <Fab sx={fabStyle} color='secondary' onClick={() => dispatch((profileIsOpen) ? closeProfile() : openProfile())}>
          <Person />
        </Fab>
      }
      {(profileIsOpen) && <Profile />}
    </>
  )
}
