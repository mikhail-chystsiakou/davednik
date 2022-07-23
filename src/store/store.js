import { configureStore } from '@reduxjs/toolkit'
import graphReducer from '../features/graph/graphSlice';
import windowReducer from '../features/window/windowSlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    window: windowReducer,
  }
})

