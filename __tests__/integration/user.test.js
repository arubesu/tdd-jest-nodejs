import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';
import User from '../../src/app/models/User';

function userMock() {
  return {
    name: 'Milford Rempel',
    email: 'milfor1d@sample.com',
    password_hash: '123456786675',
  };
}

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should encrypt user password when new user is created', async () => {
    const mock = userMock();
    const user = await User.create(mock);

    const hashResult = bcrypt.compare(mock.password, user.password_hash);
    expect(hashResult).toBeTruthy();
  });

  it('Should be able to create an user', async () => {
    const response = await request(app)
      .post('/users')
      .send(userMock());

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create an user multiple times with the same email', async () => {
    await request(app)
      .post('/users')
      .send(userMock());

    const response = await request(app)
      .post('/users')
      .send(userMock());

    expect(response.status).toBe(400);
  });
});
