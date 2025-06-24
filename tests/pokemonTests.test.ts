import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';
import { main as seedDatabase } from '../data/seed';

describe('Pokemons API Integration Test', () => {
  beforeAll(async () => {
    await prisma.pokemon.deleteMany();
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('should get all pokemons', async () => {
    const res = await request(app).get('/api/v1/pokemons');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.length).toBe(809);
  });

});
