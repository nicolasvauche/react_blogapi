import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLatestPosts } from '../../features/home/homeSlice'
import { FaPencil, FaRegTrashCan } from 'react-icons/fa6'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { latestPosts, status, error } = useSelector(state => state.home)
  const { isAuthenticated } = useSelector(state => state.authCheck)

  useEffect(() => {
    dispatch(fetchLatestPosts())
  }, [location, isAuthenticated, dispatch])

  return (
    <div className='home'>
      <h1>Bienvenue sur notre blog</h1>
      <p>
        Découvrez les derniers articles ou explorez les catégories pour en
        savoir plus.
      </p>

      <section>
        <h2>Les derniers articles</h2>
        {status === 'loading' && <p>Chargement des articles...</p>}
        {status === 'failed' && <p>Erreur : {error}</p>}
        {status === 'succeeded' && latestPosts.length > 0 ? (
          <ul>
            {latestPosts.map(post => (
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
          status === 'succeeded' && (
            <p>Aucun article disponible pour le moment.</p>
          )
        )}
      </section>
    </div>
  )
}

export default Home
