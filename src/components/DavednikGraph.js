import React, {useEffect, useState, useRef} from 'react'
import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNode } from "../features/graph/graphSlice"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function DavednikGraph({graphData, profileIsOpen}) {
  const fgRef = useRef();
  const dispatch = useDispatch();
  const currentNode = useSelector(state => state.graph.currentNode);
  console.log(currentNode);
  
  const handleNodeClick = (node) => {
    dispatch(setCurrentNode(node.id));
  };
  
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    console.log("use effect, current node: " + currentNode);
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (currentNode != null) {
        let currentNodeObj = graphData.nodes.filter(n => n.id === currentNode);
        if (currentNodeObj.length === 1) {
          let {_, height} = getWindowDimensions();
          let newX = currentNodeObj[0].x;
          let newY = currentNodeObj[0].y;
          if (profileIsOpen) {
            newY += height/8;
          }
          fgRef.current.centerAt(newX, newY);
        }
      }
    }, [graphData.nodes, currentNode]);

  

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