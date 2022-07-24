import React, { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useCallback } from "react";
import './App.css';
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import TelegramLoginButton from 'react-telegram-login';
import {
  Button
} from '@mui/material';

// import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';
import Search from './components/Search/Search';
import { setProfileOpen, setLoginedUser } from './features/graph/graphSlice'
import { pushUser } from './features/graph/graphAPI';

var data = {
  nodes: [
    { id: "Volha Lytkina", color: "#3050C1", name: "Volha" },
    { id: "B", color: "#ADA8A8" },
    { id: "C", color: "#ADA8A8" },
    { id: "D", color: "#ADA8A8" }],
  links: [
    { source: "Volha Lytkina", target: "B", value: 8 },
    { source: "Volha Lytkina", target: "C", value: 10 },
    { source: "Volha Lytkina", target: "D", value: 6 }
  ]
};

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
      }))
  };
}

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
  const [graphData, setGraphData] = useState(data);
  const dispatch = useDispatch();

  const handleTelegramResponse = response => {
    console.log(response);

    const user = {
      id: response.id,
      color: "#3050C1",
      name: response.username,
    }
    console.log (response.id)
    const userPost = {
      id: response.id,
      user: "@" + response.username,
      name: response.first_name + response.last_name ? " " + response.last_name : response.last_name,
    }
    console.log({user: userPost});

    // setGraphData({
    //   nodes: [...graphData.nodes, user],
    //   links: [...graphData.links]
    // })
    pushUser({user: userPost});
    dispatch(setLoginedUser(user));
  };

  const fakeUser = {
    "id": 245924084,
    "first_name": "mich",
    "username": "mich_life",
    "auth_date": 1658663401,
    "hash": "d819754366d50443471464184ca64571552bc3b1f022b5641c84b363e8060135"
};

  return (
    <ThemeProvider theme={theme}>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="lipenski_davednik_bot" />
        <Button onClick={() => handleTelegramResponse(fakeUser)}>Fake login</Button>
        <DavednikGraph graphData={graphData} setGraphData={setGraphData}/>
        <Main graphData={graphData} setGraphData={setGraphData}/>
    </ThemeProvider>
  );
}
