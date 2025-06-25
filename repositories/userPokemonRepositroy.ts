import { userPokemon, Pokemon } from '../lib/types';
import prisma from '../lib/prisma';

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

export async function getAllPokemonsByUserId(userId: number, search?: string) {
  if (search && search.trim() !== "") {
    const pokemons = await prisma.$queryRaw<Pokemon[]>`
      SELECT p.* FROM "UserPokemon" up
      JOIN "Pokemon" p ON up."pokemonId" = p.id
      WHERE up."userId" = ${userId}
      AND p."nameEnglish" ILIKE '%' || ${search} || '%'
    `;
    return pokemons;
  } else {
    const pokemons = await prisma.$queryRaw<Pokemon[]>`
      SELECT p.* FROM "UserPokemon" up
      JOIN "Pokemon" p ON up."pokemonId" = p.id
      WHERE up."userId" = ${userId}
    `;
    return pokemons;
  }
}
