import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCategoryDetails,
  resetCategoryDetail
} from '../../features/categoryDetail/categoryDetailSlice'
import { fetchCategoryPosts } from '../../features/post/postSlice'
import './Category.scss'

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
    dispatch(resetCategoryDetail())
    dispatch(fetchCategoryDetails(slug))
    dispatch(fetchCategoryPosts(slug))
  }, [slug, dispatch])

  return (
    <div className='category'>
      <header>
        <h1>Catégorie : {category?.name || ''}</h1>
        {categoryStatus === 'failed' && <p>Erreur : {categoryError}</p>}
      </header>

      <section>
        <h2>Articles</h2>
        {postsStatus === 'loading' && <p>Chargement des articles...</p>}
        {postsStatus === 'failed' && <p>Erreur : {postsError}</p>}
        {postsStatus === 'succeeded' && posts.length > 0 ? (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <NavLink to={`/articles/${post.slug}`}>{post.title}</NavLink>
              </li>
            ))}
          </ul>
        ) : (
          postsStatus === 'succeeded' && <p>Aucun article disponible.</p>
        )}
      </section>
    </div>
  )
}

export default CategoryDetail
