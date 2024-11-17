import React, { useState } from 'react'
import './Auth.scss'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    // Appelle l'API d'authentification ici
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
        <button type='submit'>Se connecter</button>
      </form>
    </div>
  )
}

export default Auth
