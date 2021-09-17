const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);
const User = require('../models/users');
const helper = require('./test_helper');

describe('only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Felipe Magrassi',
      password: 'ghiblifanboy',
    };

    const result = await api.post('/api/users').send(newUser).expect(500);
    expect(result.text).toContain('duplicate key error');

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'felipemagrassi',
      name: 'Felipe Magrassi',
      password: 'ghiblifanboy',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('get all users', async () => {
    const usersAtStart = await helper.usersInDb();
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(result.body).toHaveLength(usersAtStart.length);
  });
});
