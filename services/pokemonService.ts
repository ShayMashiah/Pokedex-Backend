import * as pokemonRepository from '../repositories/pokemonRepository';
import { NotFoundError, BadRequestError } from '../handlers/errors'
import type { Pokemon } from '../lib/types';

export async function getAllPokemons(
  sortBy: string = 'id',
  order: 'asc' | 'desc' = 'asc',
  search?: string
): Promise<Pokemon[]> {
  const pokemons = await pokemonRepository.findAllPokemons(sortBy, order, search);
  if (!pokemons || pokemons.length === 0) {
    throw new NotFoundError(search ? `No Pokémons found matching '${search}'` : 'No Pokémons found');
  }
  return pokemons;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const pokemon = await pokemonRepository.findPokemonById(id);
  if (!pokemon) {
    throw new NotFoundError(`Pokémon with ID ${id} not found`);
  }
  return pokemon;
}
