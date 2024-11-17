import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchPostDetails,
  resetPostDetail
} from '../../features/postDetail/postDetailSlice'
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

  // Reset post and author details when slug changes
  useEffect(() => {
    dispatch(resetPostDetail())
    dispatch(resetAuthorDetail())
    dispatch(fetchPostDetails(slug))
  }, [slug, dispatch])

  // Fetch author details when post is fetched
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

  // Loading and error states
  if (postStatus === 'loading' || authorStatus === 'loading') {
    return <p>Chargement des détails de l'article...</p>
  }

  if (postStatus === 'failed') {
    return <p>Erreur lors du chargement de l'article : {postError}</p>
  }

  if (authorStatus === 'failed') {
    return <p>Erreur lors du chargement de l'auteur : {authorError}</p>
  }

  if (!post) return <p>Aucun article trouvé.</p>

  return (
    <div className='post'>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>Publié le :</strong>{' '}
        {new Date(post.updatedAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Auteur :</strong> {author ? author.name : 'Chargement...'}
      </p>
    </div>
  )
}

export default PostDetail
