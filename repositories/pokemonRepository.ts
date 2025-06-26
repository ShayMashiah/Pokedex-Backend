import prisma from '../lib/prisma';
import type { Pokemon } from '../lib/types';

export async function findAllPokemons(
  sortBy: string,
  order: 'asc' | 'desc',
  search?: string,
  limit: number = 10,
  page: number = 1
): Promise<{ data: Pokemon[]; totalCount: number }>  {
  const offset = (page - 1) * limit;
  const searchClause = search
    ? `WHERE LOWER("nameEnglish") LIKE LOWER('%${search.replace(/'/g, "''")}%')`
    : '';

  const query = `
    SELECT * FROM "Pokemon"
    ${searchClause}
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const countQuery = `
    SELECT COUNT(*)::int as count FROM "Pokemon"
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

export async function findPokemonById(id: number) {
  const pokemon = await prisma.$queryRaw<Pokemon[]>`SELECT * FROM "Pokemon" WHERE id = ${id}`;
  return pokemon[0] ?? null;
}