import { createSlice } from '@reduxjs/toolkit'

const initState = {
  profileIsOpen: false
}

export const windowSlice = createSlice({
  name: "window",
  initialState: initState,
  reducers: {
    openProfile: (state) => {
      state.profileIsOpen = true;
    },
    closeProfile: (state) => {
      state.profileIsOpen = false;
    }
  }
})

export const { openProfile, closeProfile } = windowSlice.actions;

export default windowSlice.reducer

