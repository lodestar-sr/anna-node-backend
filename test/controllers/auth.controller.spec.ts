import request from 'supertest';
import { getRepository } from 'typeorm';

import app from '../../src/app';
import UserFactory from '../factories/user.factory';
import { connect } from '../../src/typeorm';
import { Users } from '../../src/entities/Users';

beforeAll(async () => {
    await connect();
    await getRepository(Users).clear();
});

afterAll(async () => {
   await getRepository(Users).clear();
});

describe('Auth API', () => {
    beforeEach(async () => {
        await getRepository(Users).clear();
    });

    it('Sign in successfully.', async () => {
        const user = await UserFactory();
        const actual = await request(app)
            .post('/api/auth/signin')
            .send({ email: user.email, password: 'password'});
        expect(actual.status).toBe(200);
    });

    it('Sign up successfully.', async () => {
        const actual = await request(app)
          .post('/api/auth/signup')
          .send({ email: 'test@email.com', password: 'password'});
        expect(actual.status).toBe(201);
    });

    it('Refresh successfully.', async () => {
        const user = await UserFactory();
        const tokenResponse = await request(app)
          .post('/api/auth/signin')
          .send({ email: user.email, password: 'password'})
          .expect(200);
        const { refreshToken } = tokenResponse.body;

        const actual = await request(app)
          .post('/api/auth/refresh')
          .send({ refreshToken });

        expect(actual.status).toBe(200);
    });

    it('Fetch me successfully.', async () => {
        const user = await UserFactory();
        const tokenResponse = await request(app)
          .post('/api/auth/signin')
          .send({ email: user.email, password: 'password'});
        const { accessToken } = tokenResponse.body;

        const actual = await request(app)
          .get('/api/auth/me')
          .set('authorization', `Bearer ${accessToken}`)
          .send();

        expect(actual.status).toBe(200);
    });
});
