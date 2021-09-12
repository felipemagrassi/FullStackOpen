const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((post) => {
    response.json(post);
  });
});

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((post) => {
      if (post) {
        response.json(post);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post('/', (request, response, next) => {
  const { body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedPost) => {
      response.json(savedPost);
    })
    .catch((error) => next(error));
});

blogRouter.put('/:id', (request, response, next) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, {
    runValidators: true,
    new: true,
  })
    .then((post) => response.json(post))
    .catch((error) => next(error));
});

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = blogRouter;
