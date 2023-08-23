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
    console.log("comments", response)
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
      }))

    //   .addCase(getSurah.pending, (state) => ({ ...state, isLoading: true }))
    //   .addCase(getSurah.fulfilled, (state, action) => ({
    //     ...state,
    //     isLoading: false,
    //     Comments: action.payload,
    //   }))
    //   .addCase(getSurah.rejected, (state, action) => ({
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //   }));
  },
});

export const { clearSlice } = CommentsSlice.actions;

export default CommentsSlice.reducer;