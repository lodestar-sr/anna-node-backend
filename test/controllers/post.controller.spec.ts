import request from 'supertest';
import { getRepository } from 'typeorm';

import app from '../../src/app';
import { connect } from '../../src/typeorm';
import { Posts } from '../../src/entities/Posts';
import UserFactory from '../factories/user.factory';
import { Users } from '../../src/entities/Users';
import PostFactory from '../factories/post.factory';
import { pick } from '../../src/shared/utils/pick';

let token;

beforeAll(async () => {
    await connect();
    await getRepository(Posts).clear();
    await getRepository(Users).clear();
});

afterAll(async () => {
    await getRepository(Posts).clear();
    await getRepository(Users).clear();
});

describe('Post API', () => {
    beforeEach(async () => {
        const user = await UserFactory();
        const actual = await request(app)
          .post('/api/auth/signin')
          .send({ email: user.email, password: 'password'});
        token = actual.body.accessToken;
    });

    it('Create post successfully.', async () => {
        const post = { name: 'test', info: 'test info', price: 10 };
        const actual = await request(app)
          .post('/api/post')
          .set('authorization', `Bearer ${token}`)
          .send(post);
        expect(actual.status).toBe(201);
        expect(pick(actual.body, ['name', 'info', 'price'])).toStrictEqual(post);
    });

    it('Get one post successfully.', async () => {
        const post = await PostFactory();
        const actual = await request(app)
          .get(`/api/post/${post.id}`)
          .set('authorization', `Bearer ${token}`)
          .send();
        expect(actual.status).toBe(200);
        expect(pick(actual.body, ['id', 'name', 'info', 'price']))
          .toStrictEqual(pick(post, ['id', 'name', 'info', 'price']));
    });

    it('Update one post successfully.', async () => {
        const post = await PostFactory();
        const actual = await request(app)
          .put(`/api/post/${post.id}`)
          .set('authorization', `Bearer ${token}`)
          .send({ name: 'updated name', info: 'updated info', price: 200 });
        expect(actual.status).toBe(200);
    });

    it('Delete one post successfully.', async () => {
        const post = await PostFactory();
        const actual = await request(app)
          .delete(`/api/post/${post.id}`)
          .set('authorization', `Bearer ${token}`)
          .send();
        expect(actual.status).toBe(200);
    });

    it('Fetch list successfully.', async () => {
        await PostFactory();
        const actual = await request(app)
            .get('/api/post')
            .set('authorization', `Bearer ${token}`)
            .send();
        expect(actual.status).toBe(200);
    });
});
