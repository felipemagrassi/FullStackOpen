import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog))
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
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url,
      })
      blogService.getAll().then((blog) => setBlogs(blog))
      setErrorMessage(`${blog.title} created with success`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (err) {
      setErrorMessage('Invalid parameters for creating a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleIncreaseLike = async (id, blogObj) => {
    try {
      await blogService.update(id, blogObj)
      blogService.getAll().then((blog) => setBlogs(blog))
      setErrorMessage(`${blogObj.title} likes updated to ${blogObj.likes}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (err) {
      setErrorMessage('Can\'t update this post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeletePost = async (id, blogTitle) => {
    try {
      await blogService.deletePost(id)
      const blog = await blogService.getAll()
      setBlogs(blog)
      setErrorMessage(`${blogTitle} deleted by ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (err) {
      console.log(err)
      setErrorMessage('You can\'t delete this post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          <Notification error={errorMessage}/>
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
