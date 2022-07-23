import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import './App.css';
import Profile from './components/Profile';
import Search from './components/Search/Search.js';
import ForceGraph2D from "react-force-graph-2d"


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
      [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
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

function App() {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const forceRef = useRef(null);
  useEffect(() => {
    //forceRef.current.d3Force("charge").strength(-400);
  });

  const handleNodeClick = (node) => {
    console.log("Hello from console");
    console.log(node);
    // setProfileIsOpen(true);
  };

  const handleCloseProfile = () => setProfileIsOpen(false);
  

  return (
    <ThemeProvider theme={theme}>
      <>
      <ForceGraph2D
          width={pageWidth}
          height={pageHeight}
          graphData={data}
          nodeLabel="id"
          backgroundColor="#E7E7E7"
          linkCurvature="curvature"
          enablePointerInteraction={true}
          onNodeClick={handleNodeClick}
          ref={forceRef}
          // d3AlphaMin={0.0228}
          // d3AlphaDecay={0.0228}
          // d3VelocityDecay={0.4}
          // d3AlphaDecay={0.05}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 4 ;// globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black"; //node.color;
            ctx.fillText(label, node.x, node.y + 8);
          }}
        /> 
        <Search />
        {profileIsOpen &&
          <Profile handleCloseProfile={handleCloseProfile} />
        }
      </>
    </ThemeProvider>
  );
}

export default App;
