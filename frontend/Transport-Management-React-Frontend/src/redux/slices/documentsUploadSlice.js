// redux/slices/documentsUploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

// Fetch existing documents (returns user's own record)
export const fetchDocuments = createAsyncThunk(
  'documents/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/documents/');
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

// Submit or update documents (backend handles create/update logic)
export const submitDocuments = createAsyncThunk(
  'documents/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // Backend automatically handles create vs update based on user
      const res = await axiosInstance.post('/documents/create/', formData, {
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

const documentsUploadSlice = createSlice({
  name: 'documents',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDocumentsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDocumentsState } = documentsUploadSlice.actions;
export default documentsUploadSlice.reducer;
