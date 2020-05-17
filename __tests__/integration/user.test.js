import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('Should be able to create an user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Milford Rempel',
        email: 'milford@sample.com',
        password_hash: '123456786675',
      });

    expect(response.body).toHaveProperty('id');
  });
});
