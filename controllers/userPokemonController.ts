import { Request, Response, NextFunction } from 'express';
import * as userPokemonService from '../services/userPokemonService';
import { BadRequestError, NotFoundError } from '../handlers/errors';

async function addNewPokemonToMyPokemons(req: Request, res: Response, next: NextFunction) {
  const { userId, pokemonId } = req.body;

  try {
    const newPokemon = await userPokemonService.addNewPokemonToMyPokemons(userId, pokemonId);
    res.status(201).json(newPokemon);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error('Error in addNewPokemonToMyPokemons:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getAllPokemonsByUserId(req: Request, res: Response, next: NextFunction) {
    const userId = +req.params.userId;
    const search = req.query.search as string | undefined;
    try {
        const pokemons = await userPokemonService.getAllPokemonsByUserId(userId, search);
        res.status(200).json(pokemons);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
            return;
        }
        console.error('Error in getAllPokemonsByUserId:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {addNewPokemonToMyPokemons,getAllPokemonsByUserId};
