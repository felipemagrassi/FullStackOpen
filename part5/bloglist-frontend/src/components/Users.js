import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const Users = ( { creators } ) => {

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {creators
              .map((user) => (
                <TableRow component={Link} to={`/users/${user.id}`} key={user.id}>
                  <TableCell>
                    Name: {user.name}
                  </TableCell>
                  <TableCell>
                    Posts: {user.blogPosts.length}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>


  )
}

export default Users