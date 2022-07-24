import React, { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useCallback } from "react";
import './App.css';
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';


var data = {
  nodes: [
    { id: "Volha Lytkina", color: "#3050C1", name: "Volha" },
    { id: "B", color: "#ADA8A8" },
    { id: "C", color: "#ADA8A8" },
    { id: "D", color: "#ADA8A8" }],
  links: [
    // { source: "Volha Lytkina", target: "B", value: 8 },
    // { source: "Volha Lytkina", target: "C", value: 10 },
    // { source: "Volha Lytkina", target: "D", value: 6 }
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

  return (
    <ThemeProvider theme={theme}>
      <DavednikGraph />
      <Main />
    </ThemeProvider>
  );
}
