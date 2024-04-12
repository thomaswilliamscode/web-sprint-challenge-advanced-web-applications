import React, { useState, useEffect } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const { login, isLoggedIn, redirectToArticles } = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value.trim() })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    login(values)
  }

  const isDisabled = () => {
    // ✨ implement
    let { username, password} = values
    let trimUsername = username.trim()
    let trimPassword = password.trim()
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    if ( trimUsername.length >= 3 && trimPassword.length >= 8 ) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
		if (isLoggedIn) {
			redirectToArticles();
		}
	}, [isLoggedIn]);

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials" >Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
