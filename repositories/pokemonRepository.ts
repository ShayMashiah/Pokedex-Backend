import prisma from '../lib/prisma';
import type { Pokemon } from '../lib/types';

export async function findAllPokemons(
  sortBy: string,
  order: 'asc' | 'desc',
  search?: string
): Promise<Pokemon[]>  {
  const whereClause = search
    ? `WHERE LOWER("nameEnglish") LIKE LOWER('%${search.replace(/'/g, "''")}%')`
    : '';

  const orderBy = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const query = `
    SELECT * FROM "Pokemon"
    ${whereClause}
    ORDER BY "${sortBy}" ${orderBy}
  `;

  const pokemons = await prisma.$queryRawUnsafe(query);
  return pokemons as Pokemon[];
}

export async function findPokemonById(id: number) {
  const pokemon = await prisma.$queryRaw<Pokemon[]>`SELECT * FROM "Pokemon" WHERE id = ${id}`;
  return pokemon[0] ?? null;
}