import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import { checkAuth } from '../../features/authCheck/authCheckSlice'
import './Auth.scss'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector(state => state.authCheck)
  const { status, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(login({ email, password })).then(action => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(checkAuth())
        navigate('/')
      }
    })
  }

  return (
    <div className='auth'>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span>
              <i className='spinner'></i> Connexion...
            </span>
          ) : (
            'Se connecter'
          )}
        </button>
        {error && (
          <div className='error-message'>
            <p>⚠️ {error.error}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default Auth
