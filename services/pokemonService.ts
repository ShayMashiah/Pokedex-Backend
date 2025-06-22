import * as pokemonRepository from '../repositories/pokemonRepository';

export async function getAllPokemons() {
  return await pokemonRepository.findAllPokemons();
}
