import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useCallback } from "react";
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { editUser } from './features/user/userAPI';
import { setUser } from './features/user/userSlice';
import { graphSlice, setCurrentUser } from './features/graph/graphSlice';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },
  palette: {
    secondary: {
      main: "#000000",
    }
  }
});

export default function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const me = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    setGraphData({
      nodes: [...graphData.nodes, { ...user }],
      links: graphData.links
    })
  }
  const connectNodes = (from, to) => {
    setGraphData(() => {
      return {
        nodes: [...graphData.nodes],
        links: [...graphData.links, { source: from, target: to }]
      };
    });
  }
  const updateTags = (userId, tags) => {
    const otherNodes = graphData.nodes.filter(n=>n.id!=userId);
    const node = graphData.nodes.filter(n=>n.id==userId)[0];
    const updatedNode = {...node, tags: tags}
    const oldLinks = graphData.links.filter(l => l.source.id != userId && l.target.id != userId);
    const updatedLinks = graphData.links.filter(l => l.source.id == userId || l.target.id == userId);
    editUser({
      id: updatedNode.id,
      user: updatedNode.user,
      name: updatedNode.name,
      about: updatedNode.about,
      tags: updatedNode.tags,
    })
    dispatch(setCurrentUser({...updatedNode}))

    setGraphData(() => {
      return {
        nodes: [...otherNodes, updatedNode],
        links: [...oldLinks]
      };
    });
    setGraphData(() => {
      return {
        nodes: [...graphData.nodes],
        links: [...oldLinks, ...updatedLinks]
      };
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <LoginForm
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(!isDialogOpen)}
      />
      {
        (me && me._id) ?
          <>
            <Main graphData={graphData} setGraphData={setGraphData} connectNodes={connectNodes} updateTags={updateTags} />
            <DavednikGraph graphData={graphData} setGraphData={setGraphData} />
          </>
          : (!isDialogOpen &&
            <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
          )
      }
    </ThemeProvider>
  );
}
