import { userPokemon, Pokemon } from '../lib/types';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

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

export async function getAllPokemonsByUserId(
  userId: number,
  sortBy: string,
  order: "asc" | "desc",
  search?: string,
  limit: number = 10,
  page: number = 1
): Promise<{ data: Pokemon[]; totalCount: number }> {
  const offset = (page - 1) * limit;

  const searchClause = search
    ? `AND LOWER(p."nameEnglish") LIKE LOWER('%${search.replace(/'/g, "''")}%')`
    : "";

  const query = `
    SELECT p.* FROM "UserPokemon" up
    JOIN "Pokemon" p ON up."pokemonId" = p.id
    WHERE up."userId" = ${userId}
    ${searchClause}
    ORDER BY p."${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const countQuery = `
    SELECT COUNT(*)::int as count FROM "UserPokemon" up
    JOIN "Pokemon" p ON up."pokemonId" = p.id
    WHERE up."userId" = ${userId}
    ${searchClause}
  `;

  const [pokemons, countResult] = await Promise.all([
    prisma.$queryRawUnsafe<Pokemon[]>(query),
    prisma.$queryRawUnsafe<{ count: number }[]>(countQuery),
  ]);

  return {
    data: pokemons,
    totalCount: countResult[0].count,
  };
}
