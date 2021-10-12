import React from 'react'
import { useDispatch } from 'react-redux'

import { Box, Container, Button, Paper, TableContainer, TableRow, Table, TableBody, TableCell, Typography } from '@material-ui/core'

import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  if(!blog)
    return null

  const handleDeletePost = async (id, blogTitle) => {
    try {
      await dispatch(deleteBlog(id))
      Notification(`${blogTitle} deleted by ${user.name}`)
    } catch (err) {
      dispatch(showNotification('You can\'t delete this post', 'error'))
    }
  }

  const handleIncreaseLike = async (id, blogObj) => {
    try {
      await dispatch(likeBlog(id))
      dispatch(showNotification(`${blogObj.title} likes updated to ${blogObj.likes + 1}`, 'success'))
    } catch (err) {
      dispatch(showNotification('Can\'t update this post', 'error'))
    }
  }

  const handleComment = async (id, comment) => {
    try {
      await dispatch(commentBlog(id, comment))
      dispatch(showNotification(`${blog.title} commented with ${comment}`, 'success'))
    } catch(err) {
      dispatch(showNotification('Can\'t comment this post, minimum of 5 characters to comment', 'error'))
    }
  }

  const updateLike = () => {
    handleIncreaseLike(blog.id, { title: blog.title, likes: blog.likes })
  }

  const deletePost = () => {
    if (window.confirm(`are you sure you want to remove ${blog.title} by ${blog.author}`))
      handleDeletePost(blog.id, blog.title)
  }

  return (
    <Container sx={{ display: 'flex', alignItems:'center', flexDirection:'column' }}>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableBody>
            <TableRow>
              <TableCell align='center'>
            Title: {blog.title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
            Author: {blog.author}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
            Url: {blog.url}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
            Likes: {blog.likes}
                <Button onClick={updateLike}>Like Post</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
            Owner: {blog.user.name === undefined ? 'No owner' : blog.user.name }
                <Button onClick={deletePost}>Delete Post</Button>
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h5' component='h2'>Comments</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
          <CommentForm id={blog.id} handleComment={handleComment}/>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableBody>
                {blog.comments.map((comment,i) => (
                  <TableRow key={i}>
                    <TableCell>{comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

      </Box>

    </Container>
  )
}

export default Blog
