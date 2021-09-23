import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {
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


  let createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm handleCreateBlog={createBlog}/>
    )
  })

  test(' form can update its states andn calls submit event handler ', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: `${blog.title}` }
    })
    fireEvent.change(author, {
      target: { value: `${blog.author}` }
    })
    fireEvent.change(url, {
      target: { value: `${blog.url}` }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(`${blog.title}`)
    expect(createBlog.mock.calls[0][0].author).toBe(`${blog.author}`)
    expect(createBlog.mock.calls[0][0].url).toBe(`${blog.url}`)

  })

})