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

});
