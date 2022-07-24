import React, { useEffect, useState, useRef } from 'react'
import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNode, setCurrentUser } from "../features/graph/graphSlice"
import { setWindowId } from '../features/window/windowSlice';
import * as graphAPI from '../features/graph/graphAPI';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function DavednikGraph() {
  const fgRef = useRef();
  const dispatch = useDispatch();
  const { currentNode, user } = useSelector(state => state.graph);
  const profileIsOpen = useSelector(state => state.window.windowId) === 1;
  const me = useSelector(state => state.user.user);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const handleNodeClick = (node) => {
    // dispatch(setProfileOpen(true));
    dispatch(setWindowId(1));
    console.log(node)
    dispatch(setCurrentUser({ _id: node.id }))
    dispatch(setCurrentNode(node.id));
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    console.warn(me)
    const loadGrpah = async () => {
      const users = await graphAPI.loadAllUsers();
      const edges = await graphAPI.loadAllEdges();
      const graph = { nodes: [], links: [] }
      for (const u of users) {
        graph.nodes.push({
          id: u._id, name: u.name,
          color: (u._id === me._id) ? "#3050c1" :
            (u._id === user._id) ? "#c13050" : "#AdA8A8"
        })
      }
      for (const e of edges) {
        graph.links.push({ source: e._from, target: e._to, value: 10 }) // TODO: value
      }
      setGraphData(graph)
    }
    loadGrpah().catch(console.error)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (currentNode != null) {
    let currentNodeObj = graphData.nodes.filter(n => n.id === currentNode);
    if (currentNodeObj.length === 1) {
      let { _, height } = getWindowDimensions();
      let newX = currentNodeObj[0].x;
      let newY = currentNodeObj[0].y;
      if (profileIsOpen) {
        newY += height / 7;
      }
      fgRef.current.centerAt(newX, newY, 300);
    }
  }

  console.log(graphData)
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
        const fontSize = 4;// globalScale;
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
