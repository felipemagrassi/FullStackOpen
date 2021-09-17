const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/users');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  for (let i = 0; i < helper.initialDatabase.length; i++) {
    let blogObject = new Blog(helper.initialDatabase[i]);
    await blogObject.save();
  }
  const password = await bcrypt.hash('sekret', 10);
  let correctUser = new User({
    username: 'Magrassi',
    passwordHash: password,
  });
  let incorrectUser = new User({
    username: 'unauthorizedUser',
    passwordHash: password,
  });
  correctUser.save();
  incorrectUser.save();
});

test('blog post are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blog post are all returned', async () => {
  const response = await api.get('/api/blog');

  expect(response.body).toHaveLength(helper.initialDatabase.length);
});

test('verify the unique id of the blog post', async () => {
  const post = await helper.blogsInDb();
  const response = await api.get(`/api/blog/${post[0].id}`);

  expect(response).toBeDefined();
});

test('can add a new blog post', async () => {
  const newPost = {
    title: 'new blog post',
    author: 'Felipe Magrassi',
    url: 'http://www.google.com.br',
    likes: 90,
  };

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blog');
  const content = response.body.map((r) => r.title);
  expect(response.body).toHaveLength(helper.initialDatabase.length + 1);
  expect(content).toContain('new blog post');
});

test('add post without likes', async () => {
  const newPost = {
    title: 'new blog post',
    author: 'Felipe Magrassi',
    url: 'http://www.google.com.br',
  };

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blog');
  const post = response.body[helper.initialDatabase.length];

  expect(post.likes).toBe(0);
}, 10000);

test('post without title and author is not added', async () => {
  const newPost = {
    url: 'http://www.google.com.br',
    likes: 90,
  };

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(400);
  const response = await helper.blogsInDb();

  expect(response).toHaveLength(helper.initialDatabase.length);
});

test('modify number of likes', async () => {
  const blog = await helper.blogsInDb();

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  await api
    .put(`/api/blog/${blog[0].id}`)
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send({ likes: 20000 })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await helper.blogsInDb();

  expect(response[0].likes).toBe(20000);
});

test('deletion of a post', async () => {
  const blog = await helper.blogsInDb();
  const blogToDelete = blog[0];

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  const newPost = {
    title: 'new blog post',
    author: 'Felipe Magrassi',
    url: 'http://www.google.com.br',
    likes: 90,
  };

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blog');
  expect(response.body).toHaveLength(blog.length + 1);

  await api
    .delete(`/api/blog/${blogToDelete.id}`)
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .expect(204);

  const blogAfterDeletion = await helper.blogsInDb();

  expect(blogAfterDeletion).toHaveLength(helper.initialDatabase.length);
  expect(blogAfterDeletion.map((r) => r.author)).not.toContain(
    blogToDelete.author
  );
});

test('unauthorized user cant change other user post', async () => {
  const blog = await helper.blogsInDb();
  const newPost = {
    title: 'new blog post',
    author: 'Felipe Magrassi',
    url: 'http://www.google.com.br',
    likes: 90,
  };

  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blog');
  expect(response.body).toHaveLength(blog.length + 1);

  const blogAfterPost = await helper.blogsInDb();

  const postIncorrectUser = await api
    .post('/api/login')
    .send({ username: 'unauthorizedUser', password: 'sekret' });

  await api
    .put(`/api/blog/${blogAfterPost[blogAfterPost.length - 1].id}`)
    .set('Authorization', `bearer ${postIncorrectUser.body.token}`)
    .send({ likes: 20000 })
    .expect(401);

  const responseAfterPut = await helper.blogsInDb();

  expect(responseAfterPut[responseAfterPut.length - 1].likes).not.toBe(20000);
}, 10000);

test('unauthorized user cant delete other user post', async () => {
  const blog = await helper.blogsInDb();
  const postCorrectUser = await api
    .post('/api/login')
    .send({ username: 'Magrassi', password: 'sekret' });

  const newPost = {
    title: 'new blog post',
    author: 'Felipe Magrassi',
    url: 'http://www.google.com.br',
    likes: 90,
  };

  await api
    .post('/api/blog')
    .set('Authorization', `bearer ${postCorrectUser.body.token}`)
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blog');
  expect(response.body).toHaveLength(blog.length + 1);

  const blogAfterPost = await helper.blogsInDb();

  const postIncorrectUser = await api
    .post('/api/login')
    .send({ username: 'unauthorizedUser', password: 'sekret' });

  await api
    .delete(`/api/blog/${blogAfterPost[blogAfterPost.length - 1].id}`)
    .set('Authorization', `bearer ${postIncorrectUser.body.token}`)
    .expect(401);

  const blogAfterDeletion = await helper.blogsInDb();

  expect(blogAfterDeletion).toHaveLength(helper.initialDatabase.length + 1);
  expect(blogAfterDeletion.map((r) => r.author)).toContain('Felipe Magrassi');
});

afterAll(() => {
  mongoose.connection.close();
});
