import { createSlice } from '@reduxjs/toolkit'

const initState = {
  selectedNode: { _id: "users/2626" },
}

export const graphSlice = createSlice({
  name: "graph",
  initialState: initState,
  reducers: {
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    }
  }
})

export const { setSelectedNode } = graphSlice.actions;

export default graphSlice.reducer

