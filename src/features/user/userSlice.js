import { createSlice } from '@reduxjs/toolkit'

const initState = {
  user: { _id: null, name: "" },
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
    }
  }
})

export const { setUser, setSearchResult } = userSlice.actions;

export default userSlice.reducer

