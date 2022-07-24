import React, { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import './App.css';
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import TelegramLoginButton from 'react-telegram-login';

// import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';
import Search from './components/Search/Search';
import { setProfileOpen } from './features/graph/graphSlice'

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
});

export default function App() {
  const dispatch = useDispatch();
  const profileIsOpen = useSelector(state => state.profileIsOpen);
  console.log("profileIsOpen: " + profileIsOpen)

  const handleCloseProfile = () => dispatch(setProfileOpen(false));

  const handleTelegramResponse = response => {
    console.log(response);
  };

  return (
    <ThemeProvider theme={theme}>
      <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="lipenski_davednik_bot" />
        <DavednikGraph graphData={data}/>
        <Main />
    </ThemeProvider>
  );
}
