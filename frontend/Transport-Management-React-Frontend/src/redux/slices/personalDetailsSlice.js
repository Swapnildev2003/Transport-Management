import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

// Fetch existing personal details (returns user's own record)
export const fetchPersonalDetails = createAsyncThunk(
  'personalDetails/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/personal-details/');
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

// Submit or update personal details (backend handles create/update logic)
export const submitPersonalDetails = createAsyncThunk(
  'personalDetails/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // Backend automatically handles create vs update based on user
      const res = await axiosInstance.post('/personal-details/create/', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPersonalDetailsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitPersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitPersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPersonalDetailsState } = personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
