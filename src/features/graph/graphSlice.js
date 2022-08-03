import { createSlice } from '@reduxjs/toolkit'

const initState = {
  currentNode: { id: 0 },
  nodes: [],
  links: [],
  user: { _id: "users/2626" },
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: initState,
  reducers: {
    setCurrentNode: (state, action) => {
      state.currentNode = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    connectNodes: (state, action) => {
      state.links.push({
        source: action.payload.from, target: action.payload.to
      });
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload)
    },
    disconnectNodes: (state, action) => {
      state.links = state.links.filter(
        link => (link.source.id !== action.payload.from || link.target.id !== action.payload.to)
      );
    },
    setGraphData: (state, action) => {
      state.nodes = action.payload.nodes;
      state.links = action.payload.links;
    }
  }
})

export const {
  setCurrentNode, setCurrentUser, setGraphData,
  connectNodes, addNode, disconnectNodes
} = graphSlice.actions;

export default graphSlice.reducer

