import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import './App.css';
import Profile from './components/Profile';
import Search from './components/Search/Search.js';


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

function App() {
  const [profileIsOpen, setProfileIsOpen] = useState(true);
  const forceRef = useRef(null);
  useEffect(() => {
    //forceRef.current.d3Force("charge").strength(-400);
  });

  const handleNodeClick = (node) => {
    console.log("Hello from console");
    console.log(node);
    setProfileIsOpen(true);
  };

  const handleCloseProfile = () => setProfileIsOpen(false);
  /*<ForceGraph2D
          width={pageWidth}
          height={pageHeight}
          graphData={data}
          nodeLabel="id"
          backgroundColor="#E7E7E7"
          linkCurvature="curvature"
          enablePointerInteraction={true}
          onNodeClick={handleNodeClick}
          ref={forceRef}
        /> */

  return (
    <ThemeProvider theme={theme}>
      <>
        <Search />
        {profileIsOpen &&
          <Profile handleCloseProfile={handleCloseProfile} />
        }
      </>
    </ThemeProvider>
  );
}

export default App;
