import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import ForceGraph2D from "react-force-graph-2d";
import { useDispatch, useSelector } from 'react-redux';
import * as graphAPI from '../features/graph/graphAPI';
import { setCurrentUser } from "../features/graph/graphSlice";
import { closeProfile, openProfile } from '../features/window/windowSlice';


function DavednikGraph({ graphData, setGraphData, nodeSize = 5 }) {
  const fgRef = useRef();
  const dispatch = useDispatch();
  const loginedUser = useSelector(state => state.user.user);
  const highlightedNodes = useSelector(state => state.user.searchResult);
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const [hoverNode, setHoverNode] = useState(null);

  // console.log("Graph rendered")

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
    fgRef.current.centerAt(node.x, windowDimensions.height / 7, 300);
    dispatch(openProfile());
    dispatch(setCurrentUser({ ...node, _id: node.id }))
  };

  useEffect(() => {
    const loadGrpah = async () => {
      const users = await graphAPI.loadAllUsers();
      const edges = await graphAPI.loadAllEdges();
      const graph = { nodes: [], links: [] }
      for (const u of users) {
        graph.nodes.push({
          id: u._id, name: u.name, about: u.about, tags: u.tags, tgId: u.id,
          color: "#AdA8A8"
        })
      }
      for (const e of edges) {
        graph.links.push({ source: e._from, target: e._to, value: 0 }) // TODO: value
      }
      if (graph != null) {
        setGraphData(graph)
      }
    }
    loadGrpah().catch(console.error);

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
    ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = color
    ctx.fill();
  }, [hoverNode]);

  return (
    <>
      {graphData.nodes &&
        <ForceGraph2D
          ref={fgRef}
          nodeRelSize={nodeSize} // nodes size
          autoPauseRedraw={false}

          width={windowDimensions.width}
          height={windowDimensions.height}
          graphData={graphData}
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

          // linkDirectionalParticles={3}  // for points at links
          linkWidth={2}

        />
      }
    </>
  )
}

export default DavednikGraph
