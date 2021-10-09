import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initBlog, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'


const App = () => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const [user, setUser] = useState(null)
  const blogs = useSelector(({ blog }) => blog)
  const errorMessage = useSelector(({ notification }) => notification.message)

  useEffect(() => {
    dispatch(initBlog())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const authentication = JSON.parse(
      window.localStorage.getItem('authentication')
    )
    if (loggedUser && authentication.end >= Date.now()) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      const authentication = {
        start: Date.now(),
        end: Date.now() + 60 * 60 * 1000,
      }
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.localStorage.setItem(
        'authentication',
        JSON.stringify(authentication)
      )
    } catch (err) {
      dispatch(showNotification('Wrong Credentials'))
    }
  }

  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = {
        title,
        author,
        url
      }
      dispatch(createBlog(blog))
      dispatch(showNotification(`${blog.title} created with success`))

    } catch (err) {
      dispatch(showNotification('Invalid parameters for creating a blog'))
    }
  }

  const handleIncreaseLike = async (id, blogObj) => {
    try {
      dispatch(likeBlog(id))
      dispatch(showNotification(`${blogObj.title} likes updated to ${blogObj.likes + 1}`))
    } catch (err) {
      dispatch(showNotification('Can\'t update this post'))
    }
  }

  const handleDeletePost = async (id, blogTitle) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(showNotification(`${blogTitle} deleted by ${user.name}`))
    } catch (err) {
      dispatch(showNotification('You can\'t delete this post'))
    }
  }

  const loginform = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogform = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Notification error={errorMessage}/>

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginform()}
        </div>
      ) : (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          {blogform()}
        </div>
      )}

      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleIncreaseLike={handleIncreaseLike}
            handleDeletePost={handleDeletePost}
          />
        ))}
    </div>
  )
}

export default App
