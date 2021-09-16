const bcrypt = require('bcrypt');
const User = require('../models/users');
const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogPosts', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogPosts: body.blogPosts === undefined ? [] : body.blogPosts,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
