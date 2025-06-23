import * as userPokemonRepository from '../repositories/userPokemonRepositroy';
import { BadRequestError } from '../handlers/errors';

export async function addNewPokemon(userId: string, pokemonId: string) {
  const userIdNum = parseInt(userId, 10);
  const pokemonIdNum = parseInt(pokemonId, 10);

  if (isNaN(userIdNum) || isNaN(pokemonIdNum)) {
    throw new BadRequestError('User ID and Pokemon ID must be valid numbers.');
  }

  const existingPokemon = await userPokemonRepository.findByUserAndPokemon(userIdNum, pokemonIdNum);
  if (existingPokemon) {
    throw new BadRequestError('This Pokemon is already added for the user.');
  }

  return await userPokemonRepository.addNewPokemon(userIdNum, pokemonIdNum);
}
