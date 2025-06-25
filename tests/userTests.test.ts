import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';
import { main as seedDatabase } from '../data/seed';

describe('Users API Integration Test', () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

    it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({})
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    });

    it('should create a new user with invalid data', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ id: 'invalid' })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Wrong values inserted');
    });

    it('should get all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    });

});
