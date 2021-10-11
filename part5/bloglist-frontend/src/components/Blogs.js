import React, { useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ( { blogs } ) => {
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  const blogFormRef = useRef()

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

  return (
    <div>
      <div>
        {user ? blogform() : null}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort((a, b) => (a.likes > b.likes ? -1 : 1))
              .map((blog) => (
                <TableRow component={Link} to={`/${blog.id}`} key={blog.id}>
                  <TableCell>
                    Title: {blog.title}
                  </TableCell>
                  <TableCell>
                    author: {blog.author}
                  </TableCell>
                  <TableCell>
                    likes: {blog.likes}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs