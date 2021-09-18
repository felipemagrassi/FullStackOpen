const User = require('../models/users');
const Blog = require('../models/blog');
const blogRouter = require('express').Router();
const { userExtractor, tokenExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blog);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { body } = request;
    const user = await User.findById(request.user);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes === undefined ? 0 : body.likes,
    });

    if (!request.token || !request.user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const savedPost = await blog.save();
    user.blogPosts = user.blogPosts.concat(savedPost.id);
    await user.save();

    response.json(savedPost);
  }
);

blogRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { body } = request;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const user = request.user;
    if (!request.token || !user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const post = await Blog.find({ _id: request.params.id });
    if (post[0] === undefined) {
      return response
        .status(404)
        .json({ error: "blog post already deleted or doesn't exist" });
    }

    if (post[0].user === undefined || post[0].user.equals(user)) {
      const savedPost = await Blog.findByIdAndUpdate(request.params.id, blog, {
        runValidators: true,
        new: true,
      });
      response.json(savedPost);
    } else {
      return response.status(401).json({ error: 'invalid user token' });
    }
  }
);

blogRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const user = request.user;
    if (!request.token || !user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const post = await Blog.find({ _id: request.params.id });
    if (post[0] === undefined) {
      return response
        .status(404)
        .json({ error: "blog post already deleted or doesn't exist" });
    }

    if (post[0].user === undefined || post[0].user.equals(user)) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'invalid user token' });
    }
  }
);

module.exports = blogRouter;
