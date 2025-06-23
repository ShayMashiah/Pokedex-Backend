import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAllPokemons() {
  const pokemons = await prisma.$queryRaw`SELECT * FROM "Pokemon"`;
  return pokemons;
}

export async function findPokemonById(id: number) {
  const pokemon = await prisma.$queryRaw`SELECT * FROM "Pokemon" WHERE id = ${id}`;
  return pokemon[0] ?? null;
}