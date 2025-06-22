import { Request, Response, NextFunction } from 'express';
import * as userPokemonService from '../services/userPokemonService';

async function addNewPokemon(req: Request, res: Response, next: NextFunction) {
  const { userId, pokemonId } = req.body;
  try {
    const newPokemon = await userPokemonService.addNewPokemon(userId, pokemonId);
    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
}

export default { addNewPokemon };