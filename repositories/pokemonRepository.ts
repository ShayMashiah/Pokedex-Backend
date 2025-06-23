import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAllPokemons(
  sortBy: string,
  order: 'asc' | 'desc',
  search?: string
) {
  const whereClause = search
    ? `WHERE LOWER("nameEnglish") LIKE LOWER('%${search.replace(/'/g, "''")}%')`
    : '';

  const allowedSortFields = ['id', 'nameEnglish', 'hp', 'attack'];
  if (!allowedSortFields.includes(sortBy)) {
    throw new Error(`Invalid sortBy field: ${sortBy}`);
  }

  const orderBy = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const query = `
    SELECT * FROM "Pokemon"
    ${whereClause}
    ORDER BY "${sortBy}" ${orderBy}
  `;

  const pokemons = await prisma.$queryRawUnsafe(query);
  return pokemons;
}
