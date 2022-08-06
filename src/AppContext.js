import React from 'react';

const AppContext = React.createContext();

export const ACTION_TYPES = {
  SET_GRAPH: 0,
  CONNECT_NODES: 1,
  DISCONNECT_NODES: 2,
  ADD_NODE: 3,
  EDIT_NODE: 4
}

function AppReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_GRAPH:
      return { graphData: action.payload };
    case ACTION_TYPES.CONNECT_NODES:
      return {
        graphData: {
          nodes: state.graphData.nodes,
          links: [...state.graphData.links, {
            source: action.payload.from, target: action.payload.to
          }]
        }
      }
    case ACTION_TYPES.DISCONNECT_NODES:
      return {
        graphData: {
          nodes: state.graphData.nodes,
          links: state.graphData.links.filter(link => (link.source.id !== action.payload.from || link.target.id !== action.payload.to)),
        }
      }
    case ACTION_TYPES.ADD_NODE:
      return {
        graphData: { nodes: [...state.graphData.nodes, action.payload], links: state.graphData.links }
      }
    case ACTION_TYPES.EDIT_NODE:
      console.log(state.graphData.nodes)
      return {
        graphData: {
          nodes: state.graphData.nodes.map(node => {
            console.log({ ...node, name: action.payload.node })
            return (node.id !== action.payload.id) ? node : Object.assign(node, { name: action.payload.node })
          }), links: state.graphData.links
        }
      }
    default:
      throw new Error("Invalid type");
  }
}

function AppProvider(props) {
  const [state, dispatch] = React.useReducer(AppReducer, { graphData: { nodes: [], links: [] } })
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AppContext.Provider value={value} {...props} />
}

function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider")
  };
  const [state, dispatch] = context;
  const setGraphData = data => dispatch({ type: ACTION_TYPES.SET_GRAPH, payload: data });
  const connectNodes = data => dispatch({ type: ACTION_TYPES.CONNECT_NODES, payload: data });
  const disconnectNodes = data => dispatch({ type: ACTION_TYPES.DISCONNECT_NODES, payload: data });
  const addNode = node => dispatch({ type: ACTION_TYPES.ADD_NODE, payload: node });
  const editNode = payload => dispatch({ type: ACTION_TYPES.EDIT_NODE, payload: payload });
  return {
    state, dispatch, setGraphData, connectNodes, disconnectNodes, addNode, editNode
  }
}

export { AppProvider, useApp };
