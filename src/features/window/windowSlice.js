import { createSlice } from '@reduxjs/toolkit'

const initState = {
  profileIsOpen: false
}

export const windowSlice = createSlice({
  name: "window",
  initialState: initState,
  reducers: {
    toggleProfileOpen: (state) => {
      state.profileIsOpen = !state.profileIsOpen;
    },
  }
})

export const { toggleProfileOpen } = windowSlice.actions;

export default windowSlice.reducer

