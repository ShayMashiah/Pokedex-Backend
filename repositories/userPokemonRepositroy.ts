import { PrismaClient } from '@prisma/client';
import { userPokemon } from '../lib/types';

const prisma = new PrismaClient();

export async function findByUserAndPokemon(userId: number, pokemonId: number): Promise<userPokemon | null> {
  const userPokemon = await prisma.$queryRaw<userPokemon[]>`
    SELECT * FROM "UserPokemon" 
    WHERE "userId" = ${userId} AND "pokemonId" = ${pokemonId}
  `;
  return userPokemon.length > 0 ? userPokemon[0] : null;
}

export async function addNewPokemonToMyPokemons(userId: number, pokemonId: number) {
  const newPokemon = await prisma.userPokemon.create({
    data: {
      userId,
      pokemonId,
    },
  });

  return newPokemon;
}