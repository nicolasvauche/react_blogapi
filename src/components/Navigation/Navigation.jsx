import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../features/category/categorySlice'
import './Navigation.scss'

const Navigation = () => {
  const dispatch = useDispatch()
  const { categories, status, error } = useSelector(state => state.categories) // Changer 'category' par 'categories'

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <p>Chargement des catégories...</p>
  }

  if (status === 'failed') {
    return <p>Erreur lors du chargement des catégories : {error}</p>
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Accueil</NavLink>
        </li>
        {categories.map(category => (
          <li key={category.slug}>
            <NavLink to={`/categories/${category.slug}`}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <NavLink to='/auth'>Connexion</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Inscription</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
