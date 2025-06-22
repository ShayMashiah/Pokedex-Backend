import * as pokemonRepository from '../repositories/pokemonRepository';
import type { Pokemon } from '../lib/types';

export async function getAllPokemons() {
  return await pokemonRepository.findAllPokemons();
}

export async function getPokemonById(id: string) {
  const pokemons = await pokemonRepository.findAllPokemons();
  return pokemons.find((pokemon: Pokemon) => pokemon.id === Number(id));
}
