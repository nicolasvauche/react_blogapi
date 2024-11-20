import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchPostDetails,
  resetPostDetail
} from '../../features/post/postDetailSlice'
import {
  fetchAuthorDetails,
  resetAuthorDetail
} from '../../features/author/authorSlice'
import './PostDetail.scss'

const PostDetail = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()

  const {
    post,
    status: postStatus,
    error: postError
  } = useSelector(state => state.postDetail)

  const {
    author,
    status: authorStatus,
    error: authorError
  } = useSelector(state => state.author)

  useEffect(() => {
    dispatch(resetPostDetail())
    dispatch(resetAuthorDetail())
    dispatch(fetchPostDetails(slug))
  }, [slug, dispatch])

  useEffect(() => {
    if (
      postStatus === 'succeeded' &&
      post &&
      post._links.author &&
      authorStatus === 'idle'
    ) {
      const authorSlug = post._links.author.split('/').pop()
      dispatch(fetchAuthorDetails(authorSlug))
    }
  }, [post, postStatus, authorStatus, dispatch])

  return (
    <div className='post'>
      <header>
        <h1>{post?.title || 'Chargement...'}</h1>
      </header>

      <section>
        <h2>Contenu de l'article</h2>
        {postStatus === 'loading' && (
          <p>Chargement des détails de l'article...</p>
        )}
        {postStatus === 'failed' && (
          <p>Erreur lors du chargement de l'article : {postError}</p>
        )}
        {postStatus === 'succeeded' && post && (
          <div>
            <p>{post.content}</p>
            <p>
              <strong>Publié le :</strong>{' '}
              {new Date(post.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>Auteur</h2>
        {authorStatus === 'loading' && (
          <p>Chargement des informations de l'auteur...</p>
        )}
        {authorStatus === 'failed' && (
          <p>Erreur lors du chargement de l'auteur : {authorError}</p>
        )}
        {authorStatus === 'succeeded' && author && (
          <p>
            <strong>Nom :</strong> {author.name}
          </p>
        )}
      </section>
    </div>
  )
}

export default PostDetail
