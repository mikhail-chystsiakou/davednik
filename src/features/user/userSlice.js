import { createSlice } from '@reduxjs/toolkit'

const initState = {
  user: { _id: null, name: "" },
  neighbors: [],
  searchResult: []
}

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    addNeighbor: (state, action) => {
      state.neighbors.push(action.payload);
    },
    removeNeighbor: (state, action) => {
      state.neighbors = state.neighbors.filter(neighbor => neighbor !== action.payload);
    },
    setNeighbors: (state, action) => {
      state.neighbors = action.payload;
    }
  }
})

export const { setUser, setSearchResult, addNeighbor, removeNeighbor, setNeighbors } = userSlice.actions;

export default userSlice.reducer

