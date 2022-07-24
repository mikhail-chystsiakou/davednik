import { createSlice } from '@reduxjs/toolkit'

const initState = {
  currentNode: { id: 0 },
  user: { _id: "users/2626" },
  loginedUser: {},
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
    setLoginedUser: (state, action) => {
      state.loginedUser = action.payload;
    }
  }
})

export const { setCurrentNode, setCurrentUser, setLoginedUser } = graphSlice.actions;

export default graphSlice.reducer

