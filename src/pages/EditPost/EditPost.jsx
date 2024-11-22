import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPostDetails } from '../../features/postDetail/postDetailSlice'
import { fetchCategories } from '../../features/category/categorySlice'
import { fetchCategoryDetails } from '../../features/categoryDetail/categoryDetailSlice'
import { editPost } from '../../features/postEdit/postEditSlice'
import './EditPost.scss'

const EditPost = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { post } = useSelector(state => state.postDetail)
  const { categories, status: categoriesStatus } = useSelector(
    state => state.categories
  )
  const { category, status: categoryStatus } = useSelector(
    state => state.categoryDetail
  )
  const { status, error } = useSelector(state => state.editPost)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: ''
  })

  useEffect(() => {
    dispatch(fetchPostDetails(slug))
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, slug, categoriesStatus])

  useEffect(() => {
    if (post?._links?.category) {
      const categorySlug = post._links.category.split('/').pop()
      dispatch(fetchCategoryDetails(categorySlug))
    }
  }, [post, dispatch])

  useEffect(() => {
    if (post && category) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category_id: category.id || ''
      })
    }
  }, [post, category])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.category_id) {
      alert('Veuillez sélectionner une catégorie valide.')
      return
    }

    dispatch(editPost({ slug, ...formData })).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        alert('Article modifié avec succès')
        navigate('/')
      }
    })
  }

  if (!post || categoriesStatus === 'loading' || categoryStatus === 'loading') {
    return (
      <div className='edit-post'>
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div className='edit-post'>
      <h1>Modifier l'article</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Titre</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Contenu</label>
          <textarea
            id='content'
            name='content'
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='category_id'>Catégorie</label>
          <select
            id='category_id'
            name='category_id'
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value='' disabled>
              -- Choisissez une catégorie --
            </option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span>
              <i className='spinner'></i> Modification...
            </span>
          ) : (
            "Modifier l'article"
          )}
        </button>
        {error && <p className='error'>Erreur : {error}</p>}
      </form>
    </div>
  )
}

export default EditPost
