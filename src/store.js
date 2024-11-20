import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import authCheckReducer from './features/authCheck/authCheckSlice'
import categoryReducer from './features/category/categorySlice'
import categoryDetailReducer from './features/categoryDetail/categoryDetailSlice'
import postsReducer from './features/post/postSlice'
import postDetailReducer from './features/post/postDetailSlice'
import homeReducer from './features/home/homeSlice'
import authorReducer from './features/author/authorSlice'
import registerReducer from './features/register/registerSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    authCheck: authCheckReducer,
    categories: categoryReducer,
    categoryDetail: categoryDetailReducer,
    posts: postsReducer,
    postDetail: postDetailReducer,
    home: homeReducer,
    author: authorReducer,
    register: registerReducer
  }
})

export default store
