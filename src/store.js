import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/category/categorySlice'
import categoryDetailReducer from './features/categoryDetail/categoryDetailSlice'
import postsReducer from './features/post/postSlice'
import postDetailReducer from './features/postDetail/postDetailSlice'
import homeReducer from './features/home/homeSlice'
import authorReducer from './features/author/authorSlice'

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryDetail: categoryDetailReducer,
    posts: postsReducer,
    postDetail: postDetailReducer,
    home: homeReducer,
    author: authorReducer
  }
})

export default store
