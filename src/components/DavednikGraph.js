import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'
import ForceGraph2D from "react-force-graph-2d"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from "../features/graph/graphSlice"
import { openProfile, closeProfile } from '../features/window/windowSlice';
import * as graphAPI from '../features/graph/graphAPI';


function DavednikGraph({ graphData, setGraphData, nodeSize = 5 }) {
  const fgRef = useRef();
  const dispatch = useDispatch();
  const { loginedUser } = useSelector(state => state.graph);
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
    loadGrpah().catch(console.error)
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
          linkWidth={5}

        />
      }
    </>
  )
}

export default DavednikGraph
