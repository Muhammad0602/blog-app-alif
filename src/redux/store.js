import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
