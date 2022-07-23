import { createSlice } from '@reduxjs/toolkit'

const initState = {
  currentNode: { id: 0 },
  user: {},
  graph: {},
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: initState,
  reducers: {
    setCurrentNode: (state, action) => {
      state.currentNode = action.payload;
    },
    setCurrentUser: (state, user) => {
      state.user = user;
    }
  }
})

export const { setCurrentNode } = graphSlice.actions;

export default graphSlice.reducer

