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

    it('should get all Pokemons for a user', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('nameEnglish', 'Bulbasaur');
    });

    it('should add another Pokemon to user collection', async () => {
        const res = await request(app)
        .post('/api/v1/userpokemons')
        .send({ userId: testUserId, pokemonId: 2 })
        .set('Accept', 'application/json');
        expect(res.statusCode).toBe(201);
        expect(res.body.userId).toBe(testUserId);
        expect(res.body.pokemonId).toBe(2);
    });

    it('should get all Pokemons for a user - now with more than one', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(1);
        expect(res.body[0]).toHaveProperty('nameEnglish', 'Bulbasaur');
        expect(res.body[1]).toHaveProperty('nameEnglish', 'Ivysaur');
    });

    it('should return 404 for non-existent user when getting Pokemons', async () => {
        const res = await request(app).get('/api/v1/userpokemons/9999');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User with ID 9999 not found.');
    });

    it('should return 404 when getting Pokemons for a user with no Pokemons', async () => {
        const newUser = await prisma.user.create({ data: {} });
        const res = await request(app).get(`/api/v1/userpokemons/${newUser.id}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe(`No Pokemons found for user with ID ${newUser.id}.`);
    });

    it('should return 400 for invalid userId parameter', async () => {
        const res = await request(app).get('/api/v1/userpokemons/abc');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid userId parameter');
    });

    it('should return 400 for invalid userId parameter', async () => {
        const res = await request(app).get('/api/v1/userpokemons/-50');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid userId parameter');
    });

    it('should return 400 for invalid userId parameter', async () => {
        const res = await request(app).get('/api/v1/userpokemons/0');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid userId parameter');
    });

    it('should return Pokemons filtered by search term', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}?search=Bulbasaur`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('nameEnglish', 'Bulbasaur');
    });

    it('should return not found error for search term that does not match any Pokemons', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}?search=NonExistentPokemon`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe(`No Pokemons found for user with ID ${testUserId}.`);
    });

    it('should return all Pokemons for user when search term is empty', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}?search=`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for invalid search term', async () => {
        const res = await request(app).get(`/api/v1/userpokemons/${testUserId}?search=12345`);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Search query contains invalid characters. Only letters are allowed.');
    });

});