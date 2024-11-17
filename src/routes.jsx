import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import CategoryArticles from './pages/CategoryArticles/CategoryArticles'
import PostDetail from './pages/PostDetail/PostDetail'
import Auth from './pages/Auth/Auth'
import Register from './pages/Register/Register'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/categories/:slug' element={<CategoryArticles />} />
      <Route path='/articles/:slug' element={<PostDetail />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
