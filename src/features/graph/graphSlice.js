import { createSlice } from '@reduxjs/toolkit'

const initState = {
  currentNode: { id: 0 },
  user: {},
  profileOpen: false,
  graph: {
    nodes: [
      { id: "Volha Lytkina", color: "#3050C1", name: "Volha" },
      { id: "B", color: "#ADA8A8" },
      { id: "C", color: "#ADA8A8" },
      { id: "D", color: "#ADA8A8" }],
    links: [
      { source: "Volha Lytkina", target: "B", value: 8 },
      { source: "Volha Lytkina", target: "C", value: 10 },
      { source: "Volha Lytkina", target: "D", value: 6 }
    ]
  },
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
    setGraph: (state, action) => {
      state.graph = action.payload;
    },
    setProfileOpen: (state, action) => {
      console.log("set profile open = " + action.payload);
      console.log(action.payload);
      state.profileOpen = action.payload;
    }
  }
})

export const { setCurrentNode, setProfileOpen } = graphSlice.actions;

export default graphSlice.reducer

