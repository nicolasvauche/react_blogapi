import React, { useState } from 'react'
import './Register.scss'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

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

    console.log('Données du formulaire :', formData)
    // Appelle l'API pour créer un utilisateur ici
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
        <button type='submit'>Créer un compte</button>
      </form>
    </div>
  )
}

export default Register
