import React, { useState, useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

import { tryLogin, getThemArticles } from '../actions/index'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'



export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { 
    /* ✨ implement */ 
    navigate('/')
}
  const redirectToArticles = () => { 
    /* ✨ implement */ 
  navigate('/articles');
}


  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    localStorage.removeItem('token')
    // and a message saying "Goodbye!" should be set in its proper state.
    setMessage('Goodbye!')
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    setIsLoggedIn(false)
    redirectToLogin()
  }

  const login = async ({ username, password }) => {
    let data = { username, password };
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('')
    setSpinnerOn(true)
    // and launch a request to the proper endpoint.
    let res = await tryLogin(data)
  
    setMessage(res.message)
    setIsLoggedIn(true)
    redirectToArticles()
    setSpinnerOn(false)

  }

  const getArticles = async () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('')
    setSpinnerOn(true)
    // and launch an authenticated request to the proper endpoint.
    let answer = await getThemArticles()
    console.log(answer)
    if(answer === undefined) {
      setSpinnerOn(false);
      logout()
    } else {
      const { articles, message } = answer;
      setArticles(articles);
			setMessage(message);
			// Don't forget to turn off the spinner!
			setSpinnerOn(false);
    }
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
		// ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
		<>
			<Spinner />
			<Message />
			<button id='logout' onClick={logout}>
				Logout from app
			</button>
			<div id='wrapper' style={{ opacity: spinnerOn ? '0.25' : '1' }}>
				{' '}
				{/* <-- do not change this line */}
				<h1>Advanced Web Applications</h1>
				<nav>
					<NavLink id='loginScreen' to='/'>
						Login
					</NavLink>
					<NavLink id='articlesScreen' to='/articles'>
						Articles
					</NavLink>
				</nav>
				<Routes>
					<Route
						path='/'
						element={
							<LoginForm
								login={login}
								isLoggedIn={isLoggedIn}
								redirectToArticles={redirectToArticles}
							/>
						}
					/>
					<Route
						path='articles'
						element={
							<>
								<ArticleForm />
								<Articles
									isLoggedIn={isLoggedIn}
									redirectToLogin={redirectToLogin}
                  getArticles={getArticles}
                  articles={articles}
								/>
							</>
						}
					/>
				</Routes>
				<footer>Bloom Institute of Technology 2022</footer>
			</div>
		</>
	);
}
