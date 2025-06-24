import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';
import { main as seedDatabase } from '../data/seed';

describe('Pokemons API Integration Test', () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

    it('should get all pokemons', async () => {
        const res = await request(app).get('/api/v1/pokemons');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.length).toBe(809);
    });

    it('should get a pokemon by ID', async () => {
        const res = await request(app).get('/api/v1/pokemons/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('nameEnglish', 'Bulbasaur');
    });

    it('should return 404 for a non-existent pokemon', async () => {
        const res = await request(app).get('/api/v1/pokemons/9999');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toContain('Pokémon with ID 9999 not found');
    });

    it('should return 400 for invalid pokemon ID', async () => {
        const res = await request(app).get('/api/v1/pokemons/invalid');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('Invalid Pokémon ID. It must be a positive integer.');
    });

    

});
