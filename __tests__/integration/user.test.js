import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../util/factory';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should encrypt user password when new user is created', async () => {
    const user = await factory.create('User', {
      password: 'sajdajçs1431',
    });

    const hashResult = await bcrypt.compare('sajdajçs1431', user.password_hash);
    expect(hashResult).toBeTruthy();
  });

  it('Should be able to create an user', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create an user multiple times with the same email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
