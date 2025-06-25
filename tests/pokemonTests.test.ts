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

    it('should search pokemons by name', async () => {
        const res = await request(app).get('/api/v1/pokemons?search=Bulbasaur');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty('nameEnglish', 'Bulbasaur');
    });

    it('should return 404 for search with no results', async () => {
        const res = await request(app).get('/api/v1/pokemons?search=NonExistentPokemon');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toContain("No Pokémons found matching 'NonExistentPokemon'");
    });

    it('should sort pokemons by name in ascending order', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=nameEnglish&order=asc');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].nameEnglish).toBe('Abomasnow'); 
    });

    it('should sort pokemons by name in descending order', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=nameEnglish&order=desc');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].nameEnglish).toBe('Zygarde'); 
    });

    it('should sort pokemons by hp in ascending order', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=hp&order=asc');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].hp).toBe(1); 
    });

    it('should sort pokemons by hp in descending order', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=hp&order=desc');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].hp).toBe(255); 
    });

    it('should return 400 for invalid sortBy parameter', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=speed&order=asc');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('must be one of [id, nameEnglish, hp, attack]');
    });

    it('should return 400 for invalid order parameter', async () => {
        const res = await request(app).get('/api/v1/pokemons?sortBy=nameEnglish&order=invalid');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('must be one of [asc, desc]');
    });

    it('should return 400 for invalid query parameters', async () => {
        const res = await request(app).get('/api/v1/pokemons?invalidParam=value');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('is not allowed');
    });

    it('should return 400 for empty query parameters', async () => {
        const res = await request(app).get('/api/v1/pokemons?search=');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toContain('is not allowed to be empty');
    });



    

});
