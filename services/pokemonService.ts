import * as pokemonRepository from '../repositories/pokemonRepository';
import { NotFoundError, BadRequestError } from '../handlers/errors'
import type { Pokemon } from '../lib/types';

export async function getAllPokemons(
  sortBy: string = 'id',
  order: 'asc' | 'desc' = 'asc',
  search?: string,
  limit: number = 10,
  page: number = 1
): Promise<{ data: Pokemon[]; totalCount: number }> {
  const result = await pokemonRepository.findAllPokemons(sortBy, order, search, limit, page);

  return result;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const pokemon = await pokemonRepository.findPokemonById(id);
  if (!pokemon) {
    throw new NotFoundError(`Pokémon with ID ${id} not found`);
  }
  return pokemon;
}
