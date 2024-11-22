import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCategoryDetails,
  resetCategoryDetail
} from '../../features/categoryDetail/categoryDetailSlice'
import { fetchCategoryPosts } from '../../features/post/postSlice'
import { FaPencil, FaRegTrashCan } from 'react-icons/fa6'
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

  const { isAuthenticated } = useSelector(state => state.authCheck)

  useEffect(() => {
    dispatch(resetCategoryDetail())
    dispatch(fetchCategoryDetails(slug))
    dispatch(fetchCategoryPosts(slug))
  }, [slug, isAuthenticated, dispatch])

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
                {post.canEdit && (
                  <>
                    &nbsp;&nbsp;&nbsp;
                    <a
                      href={`/edit-post/${post.slug}`}
                      className='text-info'
                    >
                      <FaPencil />
                    </a>
                    &nbsp;&nbsp;&nbsp;
                    <a
                      href={`/admin/posts/${post.slug}/delete`}
                      className='text-danger'
                    >
                      <FaRegTrashCan />
                    </a>
                  </>
                )}
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
