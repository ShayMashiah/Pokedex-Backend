import * as userPokemonRepository from '../repositories/userPokemonRepositroy';
import { BadRequestError, NotFoundError } from '../handlers/errors';
import * as userRepository from '../repositories/userRepositry';
import * as pokemonRepository from '../repositories/pokemonRepository';
import { Pokemon } from '../lib/types';

export async function addNewPokemonToMyPokemons(userId: string, pokemonId: string) {
  const userIdNum = parseInt(userId, 10);
  const pokemonIdNum = parseInt(pokemonId, 10);

  const user = await userRepository.findUserById(userIdNum);
  if (!user) {
    throw new NotFoundError(`User with ID ${userIdNum} not found.`);
  }

  const pokemon = await pokemonRepository.findPokemonById(pokemonIdNum);
  if (!pokemon) {
    throw new NotFoundError(`Pokemon with ID ${pokemonIdNum} not found.`);
  }


  const existingPokemon = await userPokemonRepository.findByUserAndPokemon(userIdNum, pokemonIdNum);
  if (existingPokemon) {
    throw new BadRequestError('This Pokemon is already added for the user.');
  }

  return await userPokemonRepository.addNewPokemonToMyPokemons(userIdNum, pokemonIdNum);
}

export async function getAllPokemonsByUserId(
  userId: number,
  sortBy: string = "id",
  order: "asc" | "desc" = "asc",
  search?: string,
  limit: number = 0,
  page: number = 1
): Promise<{ data: Pokemon[]; totalCount: number }> {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found.`);
  }

  const result = await userPokemonRepository.getAllPokemonsByUserId(
    userId,
    sortBy,
    order,
    search,
    limit,
    page
  );

  return result;
}
