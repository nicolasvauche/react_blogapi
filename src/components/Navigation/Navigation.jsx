import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../features/category/categorySlice'
import { checkAuth, logout } from '../../features/authCheck/authCheckSlice'
import './Navigation.scss'

const Navigation = () => {
  const dispatch = useDispatch()

  const {
    categories,
    status: categoriesStatus,
    error: categoriesError
  } = useSelector(state => state.categories)
  const {
    isAuthenticated,
    user,
    status: authStatus
  } = useSelector(state => state.authCheck)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (authStatus === 'idle' && token) {
      dispatch(checkAuth())
    }

    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, authStatus, categoriesStatus])

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    dispatch(logout())
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Accueil</NavLink>
        </li>
        {categoriesStatus === 'loading' && (
          <li>Chargement des catégories...</li>
        )}
        {categoriesStatus === 'succeeded' &&
          categories.map(category => (
            <li key={category.slug}>
              <NavLink to={`/categories/${category.slug}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        {isAuthenticated && (
          <li>
            <NavLink to='/add-post'>Nouvel article</NavLink>
          </li>
        )}
      </ul>
      <ul>
        {authStatus === 'loading' ? (
          <li>Chargement de l'utilisateur...</li>
        ) : isAuthenticated ? (
          <>
            <li>Bienvenue, {user?.email}</li>
            <li>
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/auth'>Connexion</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Inscription</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
