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

export default {
  getAllPokemons}