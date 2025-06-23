import * as pokemonRepository from '../repositories/pokemonRepository';
import { NotFoundError, InternalServerError, BadRequestError } from '../handlers/errors'
import type { Pokemon } from '../lib/types';

export async function getAllPokemons(
  sortBy: string = 'id',
  order: 'asc' | 'desc' = 'asc',
  search: string | undefined = undefined
): Promise<Pokemon[]> {
  try {
    const pokemons = await pokemonRepository.findAllPokemons(sortBy, order, search);
    if (!pokemons || pokemons.length === 0) {
      throw new NotFoundError(search ? `No Pokémons found matching '${search}'` : 'No Pokémons found');
    }
    return pokemons;
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error in getAllPokemons service:', error);
    throw new InternalServerError('Failed to fetch Pokémons');
  }
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  try {
    const pokemon = await pokemonRepository.findPokemonById(id);
    if (!pokemon) {
      throw new NotFoundError(`Pokémon with ID ${id} not found`);
    }
    return pokemon;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.error('Error in getPokemonById service:', error);
    throw new InternalServerError('Failed to fetch Pokémon');
  }
}
