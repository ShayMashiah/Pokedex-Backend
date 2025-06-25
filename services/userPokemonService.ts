import * as userPokemonRepository from '../repositories/userPokemonRepositroy';
import { BadRequestError, NotFoundError } from '../handlers/errors';
import * as userRepository from '../repositories/userRepositry';
import * as pokemonRepository from '../repositories/pokemonRepository';

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

export async function getAllPokemonsByUserId(userId: number) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found.`);
  }

  const pokemons = await userPokemonRepository.getAllPokemonsByUserId(userId);
    if (!pokemons || pokemons.length === 0) {
        throw new NotFoundError(`No Pokemons found for user with ID ${userId}.`);
    }
  return pokemons;
}