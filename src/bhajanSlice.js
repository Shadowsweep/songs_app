import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Papa from 'papaparse';

// Async thunk to fetch CSV data
export const fetchBhajans = createAsyncThunk('bhajans/fetchBhajans', async () => {
  const response = await fetch('./bhajanlist.csv');
  const text = await response.text();
  const parsedData = Papa.parse(text, { header: true }).data;
  return parsedData;
});

const bhajanSlice = createSlice({
  name: 'bhajans',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addBhajan: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBhajans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBhajans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBhajans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addBhajan } = bhajanSlice.actions;

export default bhajanSlice.reducer;
