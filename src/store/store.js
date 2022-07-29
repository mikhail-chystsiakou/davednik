import { configureStore } from '@reduxjs/toolkit'
import graphReducer from '../features/graph/graphSlice';
import windowReducer from '../features/window/windowSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    window: windowReducer,
    user: userReducer,
  }
})

