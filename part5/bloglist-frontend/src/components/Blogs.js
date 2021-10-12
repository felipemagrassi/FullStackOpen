import React from 'react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'


const Blogs = ( { blogs } ) => {

  return (
    <div>
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