import React  from 'react'

const User = ( { user }) => {
  if (!user)
    return null
  return (
    <div>
      <h2> {user.name} </h2>
      <h3> added blogs </h3>

      <ul>
        {user.blogPosts.map(
          (blogs) => (
            <li key={blogs.id}>
              {blogs.title}
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default User