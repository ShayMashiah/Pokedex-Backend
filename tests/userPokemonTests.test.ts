import request from 'supertest';
import app from '../app';
import prisma from '../lib/prisma';
import { main as seedDatabase } from '../data/seed';

describe('userPokemon API Integration Test', () => {
  let testUserId: number;

  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });


});
