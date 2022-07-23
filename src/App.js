import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import './App.css';
import Profile from './components/Profile';
import Search from './components/Search/Search.js';
import ForceGraph2D from "react-force-graph-2d"


var data = {
  nodes: [{ id: "Volha Lytkina", color: "#3050C1" }, { id: "B", color: "#ADA8A8" }, { id: "C", color: "#ADA8A8" }, { id: "D", color: "#ADA8A8" }],
  links: [
    { source: "Volha Lytkina", target: "B", value: 8 },
    { source: "Volha Lytkina", target: "C", value: 10 },
    { source: "Volha Lytkina", target: "D", value: 6 }
  ]
};

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
  const [profileIsOpen, setProfileIsOpen] = useState(true);

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
    setProfileIsOpen(true);
  };

  const handleCloseProfile = () => setProfileIsOpen(false);
  

  return (
    <ThemeProvider theme={theme}>
      <>
      <ForceGraph2D
          width={windowDimensions.width}
          height={windowDimensions.height}
          graphData={data}
          nodeLabel="id"
          backgroundColor="#E7E7E7"
          linkCurvature="curvature"
          enablePointerInteraction={true}
          onNodeClick={handleNodeClick}
        /> 
        <Search />
        {profileIsOpen &&
          <Profile handleCloseProfile={handleCloseProfile} />
        }
      </>
    </ThemeProvider>
  );
}
