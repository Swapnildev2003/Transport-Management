// redux/slices/bankDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

// Fetch existing bank details (returns user's own record)
export const fetchBankDetails = createAsyncThunk(
  'bankDetails/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/bank-details/');
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

// Submit or update bank details (backend handles create/update logic)
export const submitBankDetails = createAsyncThunk(
  'bankDetails/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // Backend automatically handles create vs update based on user
      const res = await axiosInstance.post('/bank-details/create/', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const bankDetailsSlice = createSlice({
  name: 'bankDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBankDetailsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBankDetailsState } = bankDetailsSlice.actions;
export default bankDetailsSlice.reducer;
