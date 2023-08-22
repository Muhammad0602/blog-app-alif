import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  posts: [],
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

// export const getSurah = createAsyncThunk('surah/getSurah', async (number) => {
//   try {
//     const response = await axios.get(`http://api.alquran.cloud/v1/surah/${number}`);
//     return response.data.data;
//   } catch (error) {
//     throw error.response.data.error;
//   }
// });

export const PostsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
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

    //   .addCase(getSurah.pending, (state) => ({ ...state, isLoading: true }))
    //   .addCase(getSurah.fulfilled, (state, action) => ({
    //     ...state,
    //     isLoading: false,
    //     posts: action.payload,
    //   }))
    //   .addCase(getSurah.rejected, (state, action) => ({
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //   }));
  },
});

export const { clearSlice } = PostsSlice.actions;

export default PostsSlice.reducer;