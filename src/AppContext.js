import React from 'react';

const AppContext = React.createContext();

const ACTION_TYPES = {
  SET_GRAPH: 0,
}

function AppReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_GRAPH:
      return { graphData: action.payload };
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
