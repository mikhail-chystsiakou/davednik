import React, {useEffect, useState, useRef} from 'react'
import ForceGraph2D from "react-force-graph-2d"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function DavednikGraph({graphData, centerNode}) {
    const fgRef = useRef();
    
    const handleNodeClick = (node) => {
      console.log("Hello from console");
      console.log(node);
      fgRef.current.centerAt(node.x, node.y);
      // setProfileIsOpen(true);
    };
    
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

  return (
    <ForceGraph2D
          ref={fgRef}
          width={windowDimensions.width}
          height={windowDimensions.height}
          graphData={graphData}
          nodeLabel="id"
          backgroundColor="#E7E7E7"
          linkCurvature="curvature"
          enablePointerInteraction={true}
          onNodeClick={handleNodeClick}
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
  )
}

export default DavednikGraph