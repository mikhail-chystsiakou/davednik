import React, { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useRef, useState } from "react";
import './App.css';
import Profile from './components/Profile';
import Search from './components/Search/Search.js';
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';


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

//inner page size
const pageWidth = document.documentElement.clientWidth
const pageHeight = document.documentElement.clientHeight

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },
});

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function App() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const graph = useSelector(state => state.graph.graph);
  // console.log(graph);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNodeClick = (node) => {
    console.log("Hello from console");
    console.log(node);
    // setProfileIsOpen(true);
  };

  const handleCloseProfile = () => setProfileIsOpen(false);


  return (
    <ThemeProvider theme={theme}>
      <>
      <DavednikGraph graphData={data} profileIsOpen={profileIsOpen}/>
        <Search />
        <Main />
        {profileIsOpen &&
          <Profile handleCloseProfile={handleCloseProfile} />
        }
      </>
    </ThemeProvider>
  );
}
