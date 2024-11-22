import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import PostDetail from './pages/PostDetail/PostDetail'
import Auth from './pages/Auth/Auth'
import Register from './pages/Register/Register'
import AddPost from './pages/AddPost/AddPost'
import EditPost from './pages/EditPost/EditPost'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/categories/:slug' element={<Category />} />
      <Route path='/articles/:slug' element={<PostDetail />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route path='/add-post' element={<AddPost />} />
      <Route path='/edit-post/:slug' element={<EditPost />} />
    </Routes>
  )
}

export default AppRoutes
