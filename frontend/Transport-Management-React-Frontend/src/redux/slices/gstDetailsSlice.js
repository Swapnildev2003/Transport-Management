// redux/slices/gstDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

// Fetch existing GST details (returns user's own record)
export const fetchGstDetails = createAsyncThunk(
  'gstDetails/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/gst-details/');
      return res.data; // Backend returns single user's record or 404
    } catch (err) {
      // 404 means no record exists yet, which is fine
      if (err.response?.status === 404) {
        return null;
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Submit or update GST details (backend handles create/update logic)
export const submitGstDetails = createAsyncThunk(
  'gstDetails/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // Backend automatically handles create vs update based on user
      const res = await axiosInstance.post('/gst-details/create/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const gstDetailsSlice = createSlice({
  name: 'gstDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetGstDetailsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGstDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGstDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGstDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitGstDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGstDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitGstDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGstDetailsState } = gstDetailsSlice.actions;
export default gstDetailsSlice.reducer;
