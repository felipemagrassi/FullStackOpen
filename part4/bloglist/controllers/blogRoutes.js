const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((post) => {
    response.json(post);
  });
});

module.exports = blogRouter;
