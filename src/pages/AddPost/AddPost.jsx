import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../../features/category/categorySlice'
import { addPost } from '../../features/postAdd/postAddSlice'
import './AddPost.scss'

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { categories, status: categoriesStatus } = useSelector(
    state => state.categories
  )
  const { status, error } = useSelector(state => state.addPost)

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, categoriesStatus])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addPost(formData)).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        alert('Article créé avec succès')
        navigate('/')
      }
    })
  }

  return (
    <div className='add-post'>
      <h1>Créer un article</h1>
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
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span>
              <i className='spinner'></i> Création...
            </span>
          ) : (
            'Créer un article'
          )}
        </button>
        {error && <p className='error'>Erreur : {error}</p>}
      </form>
    </div>
  )
}

export default AddPost
