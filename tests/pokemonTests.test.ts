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

});
