import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <TextField
            id='title'
            value={title}
            inputProps={{ minlength: 5 }}
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id='author'
            label="Author"
            value={author}
            inputProps={{ minlength: 5 }}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id='url'
            label="Url"
            value={url}
            inputProps={{ minlength: 5 }}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">create </Button>
      </form>
    </div>
  )
}

export default BlogForm
