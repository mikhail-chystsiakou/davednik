import React from 'react';

const AppContext = React.createContext();

export const ACTION_TYPES = {
  SET_GRAPH: 0,
  CONNECT_NODES: 1,
  DISCONNECT_NODES: 2,
  ADD_NODE: 3,
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
            source: action.payload._from, target: action.payload._to
          }]
        }
      }
    case ACTION_TYPES.DISCONNECT_NODES:
      return {
        graphData: {
          nodes: state.graphData.nodes,
          links: state.graphData.links.filter(
            link => (link.source.id !== action.payload.from || link.target.id !== action.payload.to)
          ),
        }
      }
    case ACTION_TYPES.ADD_NODE:
      return {
        graphData: { node: [...state.graphData.nodes, action.payload], links: state.graphData.links }
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
  const setData = data => dispatch({ type: ACTION_TYPES.SET_GRAPH, payload: data });
  return {
    state, dispatch, setData,
  }
}

export { AppProvider, useApp };
