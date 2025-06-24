import prisma from '../lib/prisma';

export async function findByUserAndPokemon(userId: number, pokemonId: number) {
  const userPokemon = await prisma.$queryRaw`
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