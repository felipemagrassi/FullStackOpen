import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
const CommentForm = ({ id, handleComment }) => {
  const [comment, setComment] = useState('')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    handleComment(id,comment)
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <div>
          Title:
          <input
            type="text"
            id='comment'
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Comment</Button>
      </form>
    </div>
  )
}

export default CommentForm
