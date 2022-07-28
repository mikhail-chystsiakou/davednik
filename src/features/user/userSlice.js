import { createSlice } from '@reduxjs/toolkit'

const initState = {
  user: {_id: null, name: ""}
}

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer

