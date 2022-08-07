import { createSlice } from '@reduxjs/toolkit'

const initState = {
  profileIsOpen: false, 
  searchIsOpen: false,
}

export const windowSlice = createSlice({
  name: "window",
  initialState: initState,
  reducers: {
    openProfile: (state) => {
      state.profileIsOpen = true;
      state.searchIsOpen = false;
    },
    closeProfile: (state) => {
      state.profileIsOpen = false;
    }, 
    openSearch: (state) => {
      state.searchIsOpen = true;
      state.profileIsOpen = false;
    },
    closeSearch: (state) => {
      state.searchIsOpen = false;
    }
  }
})

export const { openProfile, closeProfile, openSearch, closeSearch } = windowSlice.actions;

export default windowSlice.reducer

