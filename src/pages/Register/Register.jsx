import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../features/register/registerSlice'
import { checkAuth } from '../../features/authCheck/authCheckSlice'
import './Register.scss'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector(state => state.authCheck)
  const { status, error } = useSelector(state => state.register)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    dispatch(register(formData)).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        alert('Inscription réussie, vous pouvez maintenant vous connecter.')
        navigate('/auth')
      }
    })
  }

  return (
    <div className='register'>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Nom</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span>
              <i className='spinner'></i> Création...
            </span>
          ) : (
            'Créer mon compte'
          )}
        </button>
        {error && <p className='error'>Erreur : {error}</p>}
      </form>
    </div>
  )
}

export default Register
