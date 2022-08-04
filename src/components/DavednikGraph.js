import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import ForceGraph2D from "react-force-graph-2d";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setGraphData } from "../features/graph/graphSlice";
import { closeProfile, openProfile } from '../features/window/windowSlice';
import { useApp } from '../AppContext';


function DavednikGraph() {
  const dispatch = useDispatch();
  const loginedUser = useSelector(state => state.user.user);
  const highlightedNodes = useSelector(state => state.user.searchResult);
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const [hoverNode, setHoverNode] = useState(null);
  const graphData = useApp().state.graphData;

  // change graph canvas size
  const [windowDimensions, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleNodeClick = (node) => {
    setHoverNode(node)
    dispatch(openProfile());
    dispatch(setCurrentUser({ ...node, _id: node.id }))
  };
  useEffect(() => {
    function handleClickOutsideProfile(event) {
      if (event.target.tagName === "CANVAS" || event.target.id === "search") {
        dispatch(closeProfile());
      }
    };
    // Bind the event listener
    document.addEventListener('click', handleClickOutsideProfile);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutsideProfile);
    };
  }, []);

  const paintSelected = useCallback((node, ctx, color = '#c13050') => {
    // add ring just for highlighted nodes
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = color
    ctx.fill();
  }, [hoverNode]);

  //const data = { nodes: graphData.nodes.map(o => Object.assign({}, o)), links: graphData.links }

  return <ForceGraph2D
    autoPauseRedraw={false}
    width={windowDimensions.width}
    height={windowDimensions.height}
    nodeLabel="name"
    backgroundColor="#E7E7E7"
    linkCurvature="curvature"
    enablePointerInteraction={true}
    onNodeClick={handleNodeClick}
    nodeCanvasObjectMode={() => "after"}
    nodeCanvasObject={(node, ctx) => {
      const label = node.name;
      const fontSize = 4;// globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black"; //node.color;
      ctx.fillText(label, node.x, node.y + 8);
      if ((node === hoverNode && profileIsOpen) || node.id === loginedUser._id) {
        paintSelected(node, ctx, (node === hoverNode) ? "#c13050" : "#3050c1");
      } else if (highlightedNodes.includes(node.id)) {
        paintSelected(node, ctx, '#50c130')
      }
    }}

    linkWidth={2}
    graphData={{
      nodes: graphData.nodes.map(node => Object.assign({}, node)),
      links: graphData.links.map(link => Object.assign({}, link))
    }}
  /*graphData={{
    nodes: nodes.map(node => Object.assign({}, node)),
    links: links.map(link => Object.assign({}, link))
  }}*/
  />
}

export default DavednikGraph
