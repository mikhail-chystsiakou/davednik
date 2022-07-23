import { configureStore } from '@reduxjs/toolkit'
import graphReducer from '../features/graph/graphSlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
  }
})

