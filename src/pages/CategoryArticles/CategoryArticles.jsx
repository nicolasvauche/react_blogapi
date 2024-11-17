import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategoryDetails } from '../../features/categoryDetail/categoryDetailSlice'
import { fetchCategoryPosts } from '../../features/post/postSlice'
import './CategoryArticles.scss'

const CategoryDetail = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()

  const {
    category,
    status: categoryStatus,
    error: categoryError
  } = useSelector(state => state.categoryDetail)

  const {
    posts,
    status: postsStatus,
    error: postsError
  } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchCategoryDetails(slug))
    dispatch(fetchCategoryPosts(slug))
  }, [slug, dispatch])

  // Affichage des erreurs ou du chargement
  if (categoryStatus === 'loading' || postsStatus === 'loading') {
    return <p>Chargement des données de la catégorie...</p>
  }

  if (categoryStatus === 'failed') {
    return <p>Erreur lors du chargement de la catégorie : {categoryError}</p>
  }

  if (postsStatus === 'failed') {
    return <p>Erreur lors du chargement des articles : {postsError}</p>
  }

  if (!category) {
    return <p>Aucune donnée disponible pour cette catégorie.</p>
  }

  return (
    <div className='category'>
      <header>
        <h1>{category.name}</h1>
        <p>ID : {category.id}</p>
      </header>
      <div>
        <h2>Articles</h2>
        {posts.length === 0 ? (
          <p>Aucun article disponible pour cette catégorie.</p>
        ) : (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <NavLink to={`/articles/${post.slug}`}>{post.title}</NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CategoryDetail
