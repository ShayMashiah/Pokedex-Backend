import { Request, Response, NextFunction } from 'express';
import * as pokemonService from '../services/pokemonService';

async function getAllPokemons(req: Request, res: Response, next: NextFunction) {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
}

async function getPokemonById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const pokemon = await pokemonService.getPokemonById(id);
    if (!pokemon) {
       res.status(404).json({ message: 'Pokémon not found' });
       return;
    }
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
}

export default {getAllPokemons, getPokemonById};