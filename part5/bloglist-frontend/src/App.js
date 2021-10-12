import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import { Button, Container, Breadcrumbs, Typography } from '@material-ui/core'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import { showNotification } from './reducers/notificationReducer'
import { initBlog, createBlog } from './reducers/blogReducer'
import { getUsers, createUser } from './reducers/creatorsReducer'
import { userAlreadyLogged, userLoggout, userLogin } from './reducers/userReducer'
import NewUserForm from './components/NewUserForm'


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const creators = useSelector(({ creators }) => creators)
  const blogs = useSelector(({ blog }) => blog)
  const notification = useSelector(({ notification }) => notification)

  const blogFormRef = useRef()

  const matchUser = useRouteMatch('/users/:id')
  const selectedUser = matchUser ? creators.find(user => user.id === matchUser.params.id) : null
  const matchBlog = useRouteMatch('/:id')
  const selectedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  useEffect(() => {
    dispatch(initBlog())
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const authentication = JSON.parse(window.localStorage.getItem('authentication'))

    if (loggedUser && authentication.end >= Date.now()) {
      const user = JSON.parse(loggedUser)
      dispatch(userAlreadyLogged(user))
    } else {
      window.localStorage.clear()
    }

  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(userLogin({ username ,password }))
    } catch (err) {
      dispatch(showNotification('Wrong Credentials', 'error'))
    }
  }



  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    const blog = {
      title,
      author,
      url
    }
    try {
      await dispatch(createBlog(blog))
      dispatch(showNotification(`${blog.title} created with success`, 'success'))
    } catch (err) {
      dispatch(showNotification('Invalid parameters for creating a blog', 'error'))
    }}

  const blogform = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )

  const handleLogout = () => {
    dispatch(userLoggout())
  }

  const loginform = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const handleCreateUser = async (userObj) => {
    try {
      await dispatch(createUser(userObj))
      dispatch(showNotification(`${userObj.name} created with success`, 'success'))
    } catch (err) {
      dispatch(showNotification('Please use a different login name', 'error'))
    }}

  return (
    <Container>
      {user === null ? (
        <div>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumbs">
            <Link to='/'>Blogs </Link>
            <Link to='/users'>Users </Link>
            <Link to='/create'> Create New User </Link>
          </Breadcrumbs>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ mb: 1, mt: 1 }} variant='h4' component='h1' >Log in to application</Typography>
            {loginform()}
          </div>
        </div>
      ) : (
        <div>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumbs">
            <Link to='/'>Blogs </Link>
            <Link to='/users'>Users </Link>
            <Link to='/create'> Create New User </Link>
            <div>
              {user.name} logged in
              <Button onClick={handleLogout}>logout</Button>
            </div>
          </Breadcrumbs>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {blogform()}
          </div>

        </div>
      )}
      <Notification error={notification.message} type={notification.type} />

      <Switch>
        <Route path="/users/:id"> <User user={selectedUser}/> </Route>
        <Route path="/users"> <Users creators={creators}/> </Route>
        <Route path="/create"> <NewUserForm handleCreateUser={handleCreateUser}/> </Route>
        <Route path="/:id"> <Blog blog={selectedBlog}/> </Route>
        <Route path="/"> <Blogs blogs={blogs}/> </Route>
      </Switch>
    </Container>
  )
}

export default App
