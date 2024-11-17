import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLatestPosts } from '../../features/home/homeSlice'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const { latestPosts, status, error } = useSelector(state => state.home)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLatestPosts())
    }
  }, [status, dispatch])

  if (status === 'loading') return <p>Chargement...</p>
  if (status === 'failed') return <p>Erreur : {error}</p>

  return (
    <div className='home'>
      <h1>Les derniers articles</h1>
      <ul>
        {latestPosts.map(post => (
          <li key={post.id}>
            <NavLink to={`/articles/${post.slug}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
