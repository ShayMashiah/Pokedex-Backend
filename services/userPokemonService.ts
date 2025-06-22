import * as userPokemonRepository from '../repositories/userPokemonRepositroy';

export async function addNewPokemon(userId: string, pokemonId: string) {
  const existingPokemon = await userPokemonRepository.findByUserAndPokemon(userId, pokemonId);
  if (existingPokemon) {
    throw new Error('This Pokemon is already added for the user.');
  }

  return await userPokemonRepository.addNewPokemon(userId, pokemonId);
}
