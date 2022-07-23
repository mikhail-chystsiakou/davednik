import React, { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import './App.css';
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import Profile from './components/Profile';


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
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const handleNodeClick = (node) => {
    console.log("Hello from console");
    console.log(node);
    setProfileIsOpen(true);
  };

  const handleCloseProfile = () => setProfileIsOpen(false);


  return (
    <ThemeProvider theme={theme}>
      <>
        <DavednikGraph graphData={data} handleNodeClick={handleNodeClick}/>
        <Main />
        {profileIsOpen &&
          <Profile handleCloseProfile={handleCloseProfile}
          />
        }
      </>
    </ThemeProvider>
  );
}
