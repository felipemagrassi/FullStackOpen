import React, { useState } from 'react'
const Blog = ({ blog, handleIncreaseLike, handleDeletePost }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const updateLike = () => {
    handleIncreaseLike(blog.id, { title: blog.title, likes: blog.likes + 1 })
  }

  const deletePost = () => {
    if (
      window.confirm(
        `are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    )
      handleDeletePost(blog.id, blog.title)
  }

  return (
    <div>
      <div className='visibleContent' style={Object.assign({}, blogStyle, hideWhenVisible)}>
        <span>title: {blog.title}</span>
        <button onClick={toggleVisibility}>Open</button>
        <p>author: {blog.author}</p>
      </div>
      <div className='invisibleContent' style={Object.assign({}, blogStyle, showWhenVisible)}>
        <span>title: {blog.title}</span>
        <button onClick={toggleVisibility}>cancel</button>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <span>likes: {blog.likes}</span>
        <button onClick={updateLike}>like</button>
        {/* <p>Owner: {blog.user.name === undefined ? 'No owner' : blog.user.name }</p> */}
        <button onClick={deletePost}>Delete Post</button>
      </div>
    </div>
  )
}

export default Blog
