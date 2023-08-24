import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  posts: [],
  currentPage: 1,
  itemsPerPage: 50,
  currentPosts: [],
  isLoading: false,
  error: '',
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const PostsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {setCurrentPage: (state, action) => {state.currentPage = action.payload},
            setItemsPerPage: (state, action) => {state.itemsPerPage = action.payload},
            setCurrentPosts: (state, action) => {state.currentPosts = action.payload}},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getPosts.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        posts: action.payload,
      }))
      .addCase(getPosts.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
});

export const { setCurrentPage, setItemsPerPage, setCurrentPosts } = PostsSlice.actions;

export default PostsSlice.reducer;