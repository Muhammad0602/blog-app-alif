import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const getComments = createAsyncThunk('comments/getComments', async (postId) => {
  try {
    const response = await axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const CommentsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getComments.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        comments: action.payload,
      }))
      .addCase(getComments.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default CommentsSlice.reducer;
