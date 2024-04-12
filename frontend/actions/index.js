import axios from 'axios'

import axiosWithAuth from '../axios';

const loginUrl = 'http://localhost:9000/api/login';
const articlesUrl = 'http://localhost:9000/api/articles'


// - `[POST] http://localhost:9000/api/login`
//   - Expects a payload with the following properties: `username`, `password`
//   - Example of payload: `{ "username": "foo", "password": "12345678" }`
//   - The `username` length must be >= 3, and the `password` >= 8, after trimming
//   - The response to a proper request includes `200 OK` and the auth token

export const tryLogin = (data) => {
	return axios
		.post(loginUrl, data)
		.then( (res) => {
			// On success, we should set the token to local storage in a 'token' key,
			localStorage.setItem('token', res.data.token)
			// put the server success message in its proper state, and redirect
			let message = res.data.message
			// to the Articles screen. Don't forget to turn off the spinner!
			return {
				message: message
			}
		} )
		.catch( (err) => console.log(err) )
}


// - `[GET] http://localhost:9000/api/articles`
//   - Expects an `Authorization` request header containing a valid auth token
//   - The response to a proper request includes `200 OK` and a list of articles which could be empty

export const getThemArticles = () => {
	let header = axiosWithAuth()

	// continue here - 

	return header
		.get(articlesUrl)
		.then( (res) => {
			return res.data
		// On success, we should set the articles in their proper state and
		// put the server success message in its proper state.
			
		})
		.catch( (err) => {
			// If something goes wrong, check the status of the response:
			// if it's a 401 the token might have gone bad, and we should redirect to login.
			return undefined
		} )
}

// - `[POST] http://localhost:9000/api/articles`
//   - Expects an `Authorization` request header containing a valid auth token
//   - Expects a payload with the following properties: `title`, `text`, `topic`
//   - The `title` and `text` length must be >= 1, after trimming
//   - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
//   - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
//   - The response to a proper request includes `201 Created`, a success message and the new article


// - `[PUT] http://localhost:9000/api/articles/:article_id`
//   - Expects an `Authorization` request header containing a valid auth token
//   - Expects a payload with the following properties: `title`, `text`, `topic`
//   - The `title` and `text` length must be >= 1, after trimming
//   - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
//   - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
//   - The response to a proper request includes `200 OK`, a success message and the updated article


// - `[DELETE] http://localhost:9000/api/articles/:article_id`
//   - Expects an `Authorization` request header containing a valid auth token
//   - The response to a proper request includes `200 OK` and a success message