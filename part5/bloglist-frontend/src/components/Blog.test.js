import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog = {
    title: 'Test post',
    author: 'Felipe Magrassi',
    url: 'google.com',
    likes: 0,
    user: {
      name: 'Felipe Magrassi',
    }
  }
  let increaseHandler = jest.fn()
  let deleteHandler = jest.fn()

  window.confirm = jest.fn(() => true)

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog} handleIncreaseLike={increaseHandler}
        handleDeletePost={deleteHandler}
      />
    )
  })

  test('renders only title and author first', () => {
    const div = component.container.querySelector('.visibleContent')
    expect(div).toHaveTextContent(`${blog.title}`)
    expect(div).toHaveTextContent(`${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
  })

  test('renders all the content after the button is triggered', () => {
    const button = component.getByText('Open')
    fireEvent.click(button)

    const div = component.container.querySelector('.invisibleContent')

    expect(div).not.toHaveStyle('display: none')

    expect(div).toHaveTextContent(`${blog.title}`)
    expect(div).toHaveTextContent(`${blog.author}`)
    expect(div).toHaveTextContent(`${blog.url}`)
    expect(div).toHaveTextContent(`${blog.likes}`)
  })

  test('like button and event handler receive the same amount of props', () => {

    const button = component.getByText('Like Post')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(increaseHandler.mock.calls).toHaveLength(2)
  })

  test('post can be deleted', () => {
    const button = component.getByText('Delete Post')

    fireEvent.click(button)
    expect(window.confirm).toBeCalled()
  })

})
