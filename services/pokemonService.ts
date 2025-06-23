import * as pokemonRepository from '../repositories/pokemonRepository';
import { NotFoundError, InternalServerError, BadRequestError } from '../handlers/errors';
import type { Pokemon } from '../lib/types';

export async function getAllPokemons(
  sortBy: string = 'id',
  order: 'asc' | 'desc' = 'asc',
  search: string = ""
) {
  try {
    let pokemons = await pokemonRepository.findAllPokemons();

    if (!pokemons || pokemons.length === 0) {
      throw new NotFoundError('No Pokémons found');
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      pokemons = pokemons.filter((pokemon: Pokemon) =>
        pokemon.nameEnglish.toLowerCase().includes(searchTerm)
      );

      if (pokemons.length === 0) {
        throw new NotFoundError(`No Pokémons found matching name '${search}'`);
      }
    }

    const validSortFields = ['id', 'nameEnglish', 'hp', 'attack'];
    if (!validSortFields.includes(sortBy)) {
      throw new BadRequestError(`Invalid sortBy field: ${sortBy}`);
    }

    pokemons.sort((a: any, b: any) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return pokemons;
  } catch (error) {
    console.error('Error in getAllPokemons service:', error);
    if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
    throw new InternalServerError('Failed to fetch Pokémons');
  }
}
