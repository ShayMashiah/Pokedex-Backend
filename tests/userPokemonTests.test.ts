import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';
import { main as seedDatabase } from '../data/seed';

describe('userPokemon API Integration Test', () => {
  let testUserId: number;

  beforeAll(async () => {
    await seedDatabase();
  
    const newUser = await prisma.user.create({ data: {} });
    testUserId = newUser.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

    it('should add a new Pokemon to user collection', async () => {
        const res = await request(app)
        .post('/api/v1/userpokemons')
        .send({ userId: testUserId, pokemonId: 1 })
        .set('Accept', 'application/json');
        expect(res.statusCode).toBe(201);
        expect(res.body.userId).toBe(testUserId);
        expect(res.body.pokemonId).toBe(1);
    });

    it('should not add a Pokemon that already exists for the user', async () => {
        const res = await request(app)
        .post('/api/v1/userpokemons')
        .send({ userId: testUserId, pokemonId: 1 })
        .set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('This Pokemon is already added for the user.');
    });

    it('should not add a Pokemon for a non-existent user', async () => {
        const res = await request(app)
        .post('/api/v1/userpokemons')
        .send({ userId: 9999, pokemonId: 1 })
        .set('Accept', 'application/json');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User with ID 9999 not found.');
    });

    it('should not add a non-existent Pokemon to user collection', async () => {
        const res = await request(app)
        .post('/api/v1/userpokemons')
        .send({ userId: testUserId, pokemonId: 9999 }) 
        .set('Accept', 'application/json');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Pokemon with ID 9999 not found.');
    });

});