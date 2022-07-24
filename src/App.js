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
});

export default function App() {
  const[graphData, setGraphData] = useState(data);

  const connectNodes = useCallback(({from, to}) => {
      setGraphData(({ nodes, links }) => {
      return {
        nodes: [...nodes],
        links: [...links, { source: from, target: to }]
      };
    });
  }, [graphData, setGraphData]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <DavednikGraph graphData={graphData}/>
        <Main connectNodes={connectNodes}/>
      </>
    </ThemeProvider>
  );
}
