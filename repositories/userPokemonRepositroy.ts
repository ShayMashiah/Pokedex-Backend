import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findByUserAndPokemon(userId: number, pokemonId: number) {
  const userPokemon = await prisma.$queryRaw`
    SELECT * FROM "UserPokemon" 
    WHERE "userId" = ${userId} AND "pokemonId" = ${pokemonId}
  `;
  return userPokemon.length > 0 ? userPokemon[0] : null;
}

export async function addNewPokemon(userId: number, pokemonId: number) {
  const newPokemon = await prisma.userPokemon.create({
    data: {
      userId,
      pokemonId,
    },
  });

  return newPokemon;
}