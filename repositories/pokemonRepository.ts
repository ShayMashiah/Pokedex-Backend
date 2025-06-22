import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAllPokemons() {
  const pokemons = await prisma.$queryRaw`SELECT * FROM "Pokemon"`;
  return pokemons;
}
