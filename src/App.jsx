import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import Navigation from './components/Navigation/Navigation'

const App = () => {
  return (
    <Router>
      <Navigation />
      <AppRoutes />
    </Router>
  )
}

export default App
