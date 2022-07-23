import { createSlice } from '@reduxjs/toolkit'

const initState = {
  windowId: 0
}

export const windowSlice = createSlice({
  name: "window",
  initialState: initState,
  reducers: {
    setWindowId: (state, action) => {
      state.windowId = action.payload;
    },
  }
})

export const { setWindowId } = windowSlice.actions;

export default windowSlice.reducer

