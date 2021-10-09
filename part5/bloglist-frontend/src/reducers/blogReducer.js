import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.payload
  case 'CREATE_BLOG':
    return [...state, action.payload]
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.payload)
  case 'LIKE_BLOG':{
    const likedBlog = state.find(blog => blog.id === action.payload)
    likedBlog.likes++
    const items = state.filter(blog => blog.id !== action.payload)
    return [...items, likedBlog]
  }
  default:
    return state
  }
}

export const initBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      payload: createdBlog
    }
    )
  }
}

export const likeBlog = (id, blogObject) => {
  return async dispatch => {
    const likedBlog = await blogService.update(id,blogObject)
    dispatch({
      type: 'LIKE_BLOG',
      payload: likedBlog.id
    }
    )
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deletePost(id)
    dispatch({
      type: 'DELETE_BLOG',
      payload: id,
    })
  }
}

export default blogReducer