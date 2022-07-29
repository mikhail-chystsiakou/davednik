import { createSlice } from '@reduxjs/toolkit'

const initState = {
  currentNode: { id: 0 },
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
    }
  }
})

export const { setCurrentNode, setCurrentUser } = graphSlice.actions;

export default graphSlice.reducer

