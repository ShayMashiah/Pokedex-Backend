import { Request, Response, NextFunction } from 'express';
import * as userPokemonService from '../services/userPokemonService';

async function addNewPokemonToMyPokemons(req: Request, res: Response, next: NextFunction) {
  const { userId, pokemonId } = req.body;
  try {
    const newPokemon = await userPokemonService.addNewPokemonToMyPokemons(userId, pokemonId);
    res.status(201).json(newPokemon);
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const err = error as { statusCode: number; message: string };
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default { addNewPokemonToMyPokemons };
