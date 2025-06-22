import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findByUserAndPokemon(userId: string, pokemonId: string) {
  const userPokemon = await prisma.$queryRaw`
    SELECT * FROM "UserPokemon" 
    WHERE "userId" = ${userId} AND "pokemonId" = ${pokemonId}
  `;
  return userPokemon.length > 0 ? userPokemon[0] : null;
}

export async function addNewPokemon(userId: string, pokemonId: string) {
  const newPokemon = await prisma.$queryRaw`
    INSERT INTO "UserPokemon" ("userId", "pokemonId") 
    VALUES (${userId}, ${pokemonId}) 
    RETURNING *
  `;
  return newPokemon[0];
}