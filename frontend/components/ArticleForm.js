import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const { redirectToLogin, isLoggedIn, articles, currentArticleId, updateArticle, postArticle, setCurrentArticleId, setMessage } = props;



  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    if(currentArticleId) {
      let info = articles.find((article) => {
				return article.article_id === currentArticleId;
			});
			const { title, text, topic} = info
      setValues( {
        title: title,
        text: text,
        topic: topic,
      })
    } else {
      setValues(initialFormValues)
    }

  }, [currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    if(currentArticleId){
			// put request here
			let data = { currentArticleId, values };
			updateArticle(data);
			
		} else {
      // post request here
      postArticle(values)
    }
    setValues(initialFormValues);
  }

  const isDisabled = () => {
    const { title, text, topic } = values
    // ✨ implement
    // Make sure the inputs have some values
    if ( title && text && topic) {
      return false
    } else {
      return true
    }
  }

  const cancelEdit = (e) => {
    // flush currentId
    e.preventDefault()
    setCurrentArticleId()
  }

  return (
		// ✨ fix the JSX: make the heading display either "Edit" or "Create"
		// and replace Function.prototype with the correct function
		<form id='form' onSubmit={onSubmit}>
			<h2>Create Article</h2>
			<input
				maxLength={50}
				onChange={onChange}
				value={values.title}
				placeholder='Enter title'
				id='title'
			/>
			<textarea
				maxLength={200}
				onChange={onChange}
				value={values.text}
				placeholder='Enter text'
				id='text'
			/>
			<select onChange={onChange} id='topic' value={values.topic}>
				<option value=''>-- Select topic --</option>
				<option value='JavaScript'>JavaScript</option>
				<option value='React'>React</option>
				<option value='Node'>Node</option>
			</select>
			<div className='button-group'>
				{!currentArticleId ? (
					<button disabled={isDisabled()} id='submitArticle'>
						{currentArticleId ? 'Submit' : 'Submit'}
					</button>
				) : (
          <>
            <button disabled={isDisabled()} id='submitArticle'>
              {currentArticleId ? 'Submit' : 'Submit'}
            </button>
					<button onClick={cancelEdit}>Cancel edit</button>
          </>
				)}
			</div>
		</form>
	);
}

// 🔥 No touchy: ArticleForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
