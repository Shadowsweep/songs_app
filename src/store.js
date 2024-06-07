import { configureStore } from '@reduxjs/toolkit';
import bhajanReducer from './bhajanSlice';

export const store = configureStore({
  reducer: {
    bhajans: bhajanReducer,
  },
});
